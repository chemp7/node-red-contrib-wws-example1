/**
   Copyright (c) 2017 tyoshida

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
**/

module.exports = function(RED) {
	"use strict";
	var request = require('request');
	var url = require('url');

	function actionfulfillment(n) {
		RED.nodes.createNode(this, n);
		this.wwsApplications = RED.nodes.getNode(n.wwsApplications);
        var nodeQueryType = n.queryType || "use";
        var nodeActionId = n.actionId;
        var nodeAnnotations = n.annotations;
		
		this.on('input', function(msg) {
			var appId = this.wwsApplications.appId;
			var appSecret = this.wwsApplications.appSecret;
			var token = this.wwsApplications.accessToken;
			var node = this;
			var annotations = msg.annotations;
			var queryType = msg.queryType;
			var actionId = msg.actionId;			
			var query;
			annotations = '[{genericAnnotation: {title: "Sample Title", text: "Sample Body", buttons: [{postbackButton: {title: "Sample Button", id: "Sample_Button", style: PRIMARY}}]}}]';
			var wwscb = msg.payload;
			var annotationPayload = JSON.parse(wwscb.annotationPayload);
			var conversationId = annotationPayload.conversationId;
			var targetUserId = annotationPayload.updatedBy;
			var targetDialogId = annotationPayload.targetDialogId;
			var actionId = annotationPayload.actionId;
			console.log("**************");
			console.log("conversationId: " + conversationId);
			console.log("targetUserId: " + targetUserId);
			console.log("targetDialogId: " + targetDialogId);
			console.log("actionId: " + actionId);
			console.log("actionId2: " + nodeActionId);
			console.log("**************");

			if (nodeQueryType !== "use"){
				queryType = nodeQueryType;
				annotations = nodeAnnotations;
			}

			if (nodeActionId !== "" && nodeActionId !== actionId) {
					node.status({fill:"blue",shape:"dot",text:"This msg was not the target actionId."});
					node.send(msg);
			} else {
				if (queryType === "createTargetedMessage") {
					query = generateQueryStringCreateTargetedMessage(conversationId, targetUserId, targetDialogId, annotations);
				}
		
				console.log("query: " + query);
					
				sendQuery(query, token, function(err, body) {
					if (err) {
						node.error("Query error: " + query +" (error: " + err + ")");
						node.status({fill:"red",shape:"dot",text:"Query error"});
					} else {
						node.status({fill:"green",shape:"dot",text:"Post Ok"});
						try {
							msg.payload = JSON.parse(body);
							node.send(msg);
						}
						catch(e) { node.error("JSON Parse error: " + body); }
					}
				});
			}
		});
	}
	
	RED.nodes.registerType("actionfulfillment", actionfulfillment);
	
	function sendQuery(query, token, cb) {
		var options = {
			url: 'https://workspace.ibm.com/graphql',
			method: 'POST',
			headers: {
				jwt : token,
				'content-type' : 'application/graphql',
				'x-graphql-view': 'PUBLIC, BETA'
			},
			json: true,
			form: {
				'query': query
			}
		}

		request(options, function(err, res) {
			if (err) {
				console.log("error: query = " + _query);
				cb(err);
			}
			if (res.statusCode === 200) {
				console.log("success: "+JSON.stringify(res.body));
				if (res.body.hasOwnProperty("errors")) {
					for (var i = 0; i < res.body.errors.length; i++) {
						console.log("reqponse.body.errors[" + i + "].message: " + res.body.errors[i].message);
					}
					cb(true);
				} else {
					cb(null, JSON.stringify(res.body.data));
				}
			} else {
				console.log("error: statusCode = " + res.statusCode);
				cb(true);
			}
			return;
		});	
	}

	function generateQueryStringCreateTargetedMessage(conversationId, targetUserId, targetDialogId, annotations) {
		var query = "mutation {" + "createTargetedMessage(input: {" +
		'conversationId: "' + conversationId + '"' +
		'targetUserId: "' + targetUserId + '"' +
		'targetDialogId: "' + targetDialogId + '"' +
		'annotations: ' + annotations +
		'attachments: []' + 
		'}) {successful}}';

		return query;
	}
};
