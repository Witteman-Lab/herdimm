


#Welcome to Herdimm Project

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```


---


# This is how we set up animation
```
 {
  "action": "zoom",
  "props": 
    {
        "scale" : "4",
        "duration" : "2000",
        "transformOrigin_X" : "52",
        "transformOrigin_Y": "43",
        "startTime" : "1000",
        "timingFunction": "linear"
    }
}
```



```

{
  "action" : "makeContour",
  "props" : 
  {
    "target" : ".avatar",
    "duration" : "1000",
    "class" : "contour",
    "startTime" : "300",
    "add" : true
  }
}
```



```
{
  "action": "changeShapeColor",
  "props": 
    {
        "target": ".vulnerable",
        "state": "vulnerability",
        "startTime": "4000",
        "duration": "1000"
    }
}
```





```
{
  "action": "burst",
  "props": 
    {
        "target": "shape_41",
        "scale": "1.2",
        "state": "infected",
        "timingFunction": "linear",
        "startTime" : "500",
        "duration" : "250",
        "add" : true | false
    }
}
```




```
{
  "action": "parseSpreadInfection",
  "props": 
   {
        "file": "spreadinfections1.json",
        "startTime": "1000",
        "durationLine": "1000",
        "durationLineBouncingOff": "250"
    }
}
```





```
{
  "action": "fadeInOut",
  "props": 
    {
        "startTime" : "10000",
        "duration": "2000"
    }
}
```



```
{
  "action": "resetGrid",
  "props": 
  {
    "startTime" : "11000"
  }
},
```



```
{
  "action": "changeShapeColor",
  "props": 
   {
    "target": "#shape_61",
    "state": "infected",
    "timingFunction": "linear",
    "startTime" : "7000",
    "duration" : "250"
  }
}
```



```
{
  "action": "vaccination",
  "props": 
    {
        "file" : "vaccineCoverageAdd2.json",
        "duration": "0",
        "state": "vaccinated",
        "startTime" : "100",
        "add": true,
        "makeTransformer": true,
        "startTimeMakeTransformer": "0"
  }
}
```



```
{
  "action": "vaccination",
  "props": 
    {
        "file" : "vaccineCoverageRemove24.json",
        "duration": "1",
        "state": "vaccinated",
        "startTime" : "100",
        "add": false,
        "makeTransformer": true,
        "startTimeMakeTransformer": "0"
  }
}
```



```
{
  "action": "removeBarrier",
  "props": 
    {
        "startTime" : "700"
    }
}
```



```    
{
  "action": "removeInfection",
  "props": 
    {
        "startTime" : "1000"
    }
}
```



```
{
 "action": "parseSpreadInfection",
  "props": 
   {
    "file" : ["flu.json","measles.json","pertussis.json"],
    "startTime" : "500"
  }
}
```
