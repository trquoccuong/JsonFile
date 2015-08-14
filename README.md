# Write data to file

### Introduction

>Sometimes you need to log complex data(request,socket ...). This module help you write this data to file

### Install

```
$npm install jsonfile
```

### How to use

```
var jsonFile = require('jsonfile');
jsonfile(<link to file or name of file>,<data you want to write>,<option>)

```
support Circular object

### Option

| Option  | Desciption |
| ------------- | ------------- |
| array | default false, replace all array to '[Array]' |