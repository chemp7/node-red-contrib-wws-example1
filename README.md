# node-red-contrib-www-example1

![Version: 0.0.3](https://img.shields.io/badge/Version-0.0.3-green.svg)


## Overview
This node of Node-RED nodes is for Watson Workspace Action Fulfillment.

This node use with node-red-contrib-wwsNodes.

## Node

**wws action fulfillment**
  - This node post query of createTargetedMessage.
  - This node adds '"x-graphql-view": "PUBLIC, BETA"' in headers.


## Usage: annotations setting
There are two ways to set annotations.

**When setting to the property of the node**

annotations property: 
```html:example
[{genericAnnotation: {title: "Sample Title", text: "Sample Body", buttons: [{postbackButton: {title: "Sample Button", id: "Sample_Button", style: PRIMARY}}]}}]
```

**When setting with the previous function node**
msg.annotations 

```html:example
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
```

## Usage: attachments setting
There are two ways to set attachments.

**When setting to the property of the node**

attachments property: 
```html:example
[{type: CARD, cardInput: {type: INFORMATION, informationCardInput: {title: "Sample Title", subtitle: "Sample Subtitle", text: "Sample Text", date: "1500573338000", buttons: [{text: "Sample Button Text", payload: "Sample Button Payload",style: PRIMARY}]}}}]
```

**When setting with the previous function node**
msg.attachments 

```html:example
msg.attachments = [{
    type: "CARD", 
    cardInput: { 
        type: "INFORMATION", 
        informationCardInput: { 
            title: "Sample Title", 
            subtitle: "Sample Subtitle", 
            text: "Sample Text", 
            date: "1500573338000", 
            buttons: [{ 
                text: "Sample Button Text", 
                payload: "Sample Button Payload", 
                style: "PRIMARY" 
            }] 
        } 
    } 
}];
```


## Licence

Apache License Version 2.0.

This software includes the work that is distributed in the Apache License 2.0.

## Author

[Takeshi Yoshida](https://github.com/chemp7)


## Releace

2017/11/09 v0.0.5 fix

2017/09/22 v0.0.4 fix

2017/09/22 v0.0.3 bug fix

2017/09/22 v0.0.2 add parameter of attachments

2017/09/02 v0.0.1 Initial

