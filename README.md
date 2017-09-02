# node-red-contrib-www-example1

## Overview
This node of Node-RED nodes is for Watson Workspace Action Fulfillment. 
This node use with node-red-contrib-wwsNodes.

## Node

**wws action fulfillment**
  - This node post query of createTargetedMessage.
  - This node adds '"x-graphql-view": "PUBLIC, BETA"' in headers.


## How to use
Example

**When setting to the property of the node**
annotations property: [{genericAnnotation: {title: "Sample Title", text: "Sample Body", buttons: [{postbackButton: {title: "Sample Button", id: "Sample_Button", style: PRIMARY}}]}}]

**When setting with the previous function node**
msg.annotations = [{
    genericAnnotation: {
        title: "Sample Title", 
        text: "Sample Body", 
        buttons: [{
            postbackButton: {
                title: "Sample Button", 
                id: "Sample_Button",
                style: "PRIMARY"
            }
        }]
    }
}];


## Licence

Apache License Version 2.0.

This software includes the work that is distributed in the Apache License 2.0.

## Author

[Takeshi Yoshida](https://github.com/chemp7)


## Releace

2017/09/02 v0.0.1 Initial

