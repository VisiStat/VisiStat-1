function OnMouseDown(e)
{
    if (e == null) 
        e = window.event; 

    var target = e.target != null ? e.target : e.srcElement;
   
    if(!freezeMouseEvents)
    {        
        if(help)
        {            
            if((e.button == 1 && window.event != null || e.button == 0) && (target.className.baseVal == "helpButtonFront"))
            {
                var helpButton = d3.select(".helpButtonBack");
                var helpButtonText = d3.select(".helpButtonText");
                
                help = false;
                
                helpButton.attr("fill", "url(#buttonFillNormal)")
                            .attr("filter", "url(#Bevel)")
                            .attr("stroke", "black");
            
                helpButtonText.attr("fill", "black");
                removeElementById("descriptionPanel");
                
                removeElementsByClassName("plot");
            }
        }
        else
        {
            if((e.button == 1 && window.event != null || e.button == 0) && (target.className.baseVal == "variableNameHolderFront"))
            {
                setup(e, target);        
        
                //add to list of variables selected
                currentVariableSelection = setColorsForVariables(currentVariableSelection, target.id);
        
                //display the current variable selection
                console.log("\n\n\ncurrent variable selection: [" + currentVariableSelection + "]\n");
        
                removeElementsByClassName("displayDataTable");
                removeElementsByClassName("displayDataText");
              
                restrictVisualisationSelection();      
                plotVisualisation(); //checks which plot is selected and draws that plot
                setColorsForVisualisations(); //manages the fill colors of vizualizations (only one at a time)
                
                var rButton = d3.select(".backButtonBack");
                
                rButton.attr("fill", "grey")
                        .attr("filter", "none")
                        .attr("stroke", "none");
                
                states = [];
//                 
//                 var subState = null;
//                 
//                 if(currentVisualisationSelection == "Boxplot")
//                     subState = "base";
//                 
//                 states.push({visualisation: currentVisualisationSelection, variables: currentVariableSelection.slice(), substate: subState});
//                 
//                 console.dir(states);
            }
    
            else if((e.button == 1 && window.event != null || e.button == 0) && (target.className.baseVal == "visualisationHolderFront"))
            {
                setup(e, target);    
                currentVisualisationSelection = target.id;        
                setColorsForVisualisations();        
                plotVisualisation();
                
                var rButton = d3.select(".backButtonBack");
                
                rButton.attr("fill", "grey")
                        .attr("filter", "none")
                        .attr("stroke", "none");

                
                states = [];
//                 
//                 states.push({visualisation: currentVisualisationSelection, variables: currentVariableSelection.slice()});               
//                 
//                 console.dir(states);
            }
    
            else if((e.button == 1 && window.event != null || e.button == 0) && (target.className.baseVal == "variableTypeToggleButton"))
            {
                setup(e, target);
                
                // 
//                 var variableNameHolderBack = d3.select("#" + target.id + ".variableNameHolderBack");
//                 var toggleButton = d3.select("#" + target.id + ".variableTypeToggleButton");
//                 var dependentVariableText = d3.select("#" + target.id + ".dependentVariableText");
//                 var independentVariableText = d3.select("#" + target.id + ".independentVariableText");
//                 if(toggleButton.attr("xlink:href") == "images/toggle_up.png")
//                 {
//                     toggleButton.attr("xlink:href","images/toggle_down.png");
//             
//                     if(variableNameHolderBack.attr("fill") == "url(#buttonFillNormal)")
//                         independentVariableText.attr("fill", "#627bf4");
//                     else
//                         independentVariableText.attr("fill", "white");
//                 
//                     dependentVariableText.attr("fill", "#BEC9FC");
//                 }
//                 else if(toggleButton.attr("xlink:href") == "images/toggle_down.png")
//                 {
//                     toggleButton.attr("xlink:href","images/toggle_up.png");
//             
//                     if(variableNameHolderBack.attr("fill") == "url(#buttonFillNormal)")
//                         dependentVariableText.attr("fill", "#627bf4");
//                     else
//                         dependentVariableText.attr("fill", "white");
//                     independentVariableText.attr("fill", "#BEC9FC");
//                 }
            }
    
            else if((e.button == 1 && window.event != null || e.button == 0) && (target.className.baseVal == "disabled"))
            {
                setup(e, target);
        
                if(document.getElementById("plotCanvas") != null)
                            removeElementById("plotCanvas");
                if(document.getElementById("sideBarCanvas") != null)
                            removeElementById("sideBarCanvas");        
        
                removeElementsByClassName("displayDataTable");
                removeElementsByClassName("displayDataText");
        
                displayDataForVariable(target.id);
            }
    
            else if((e.button == 1 && window.event != null || e.button == 0) && target.className.baseVal == "means")
            {
                setup(e, target);    
        
                //get the selected mean
                var meanCircle = d3.selectAll("#" + target.id + ".means");

                if(meanCircle.attr("r") == engorgedMeanRadius)             
                {
                    if(meanCircle.attr("fill") == meanColors["click"])
                    {
                        //we are cancelling a mean
                        meanCircle.attr("fill", meanColors["normal"]);
            
                        //remove all complete lines associated with this and join the missing ones
                        var completeLines = document.getElementsByClassName("completeLines");
                        var lineBefore, lineAfter;
            
                        for(var i=0; i<completeLines.length; i++)
                        {
                            if(completeLines[i].getAttribute("x1") == meanCircle.attr("cx"))
                            {
                                lineAfter = completeLines[i];
                            }
                            if(completeLines[i].getAttribute("x2") == meanCircle.attr("cx"))
                            {
                                lineBefore = completeLines[i];
                            }
                        }
            
                        if(lineBefore == undefined && lineAfter == undefined)
                        {
                            //it was the only mean selected - just remove the existing incomplete line                    
                            removeElementsByClassName("incompleteLines");
                        }
                        else if(lineAfter == undefined)
                        {                
                            removeElementsByClassName("incompleteLines");
                            var canvas = d3.select("#plotCanvas");
            
                            canvas.append("line")
                                    .attr("x1", lineBefore.getAttribute("x1"))
                                    .attr("y1", lineBefore.getAttribute("y1"))
                                    .attr("x2", lineBefore.getAttribute("x1"))
                                    .attr("y2", lineBefore.getAttribute("y1"))
                                    .attr("stroke", meanColors["normal"])
                                    .attr("stroke-dasharray", "5,5")
                                    .attr("id", meanCircle.attr("id"))
                                    .attr("class", "incompleteLines");
                
                            lineBefore.parentNode.removeChild(lineBefore);
                        }
                        else if(lineBefore == undefined)
                        {                                
                            removeElementsByClassName("incompleteLines");
                            var canvas = d3.select("#plotCanvas");
                    
                            if(document.getElementsByClassName("completeLines").length > 0)
                            {
                                var endingLine = findEndingLine();
                        
                                canvas.append("line")
                                        .attr("x1", endingLine.getAttribute("x2"))
                                        .attr("y1", endingLine.getAttribute("y2"))
                                        .attr("x2", endingLine.getAttribute("x2"))
                                        .attr("y2", endingLine.getAttribute("y2"))
                                        .attr("stroke", meanColors["normal"])
                                        .attr("stroke-dasharray", "5,5")
                                        .attr("id", meanCircle.attr("id"))
                                        .attr("class", "incompleteLines");
                            }
                            else
                            {
                                canvas.append("line")
                                        .attr("x1", lineAfter.getAttribute("x2"))
                                        .attr("y1", lineAfter.getAttribute("y2"))
                                        .attr("x2", lineAfter.getAttribute("x2"))
                                        .attr("y2", lineAfter.getAttribute("y2"))
                                        .attr("stroke", meanColors["normal"])
                                        .attr("stroke-dasharray", "5,5")
                                        .attr("id", meanCircle.attr("id"))
                                        .attr("class", "incompleteLines");
                            }
                
                            lineAfter.parentNode.removeChild(lineAfter);

                        }
                        else
                        {
                            removeElementsByClassName("incompleteLines");
                
                            var canvas = d3.select("#plotCanvas");
            
                            if(document.getElementsByClassName("completeLines").length > 0)
                            {
                                var endingLine = findEndingLine();
                        
                                canvas.append("line")
                                        .attr("x1", endingLine.getAttribute("x2"))
                                        .attr("y1", endingLine.getAttribute("y2"))
                                        .attr("x2", endingLine.getAttribute("x2"))
                                        .attr("y2", endingLine.getAttribute("y2"))
                                        .attr("stroke", meanColors["normal"])
                                        .attr("stroke-dasharray", "5,5")
                                        .attr("id", meanCircle.attr("id"))
                                        .attr("class", "incompleteLines");
                            }
                            else
                            {
                                canvas.append("line")
                                        .attr("x1", lineAfter.getAttribute("x2"))
                                        .attr("y1", lineAfter.getAttribute("y2"))
                                        .attr("x2", lineAfter.getAttribute("x2"))
                                        .attr("y2", lineAfter.getAttribute("y2"))
                                        .attr("stroke", meanColors["normal"])
                                        .attr("stroke-dasharray", "5,5")
                                        .attr("id", meanCircle.attr("id"))
                                        .attr("class", "incompleteLines");
                            }
                        
                            lineBefore.setAttribute("x2", lineAfter.getAttribute("x2"));
                            lineBefore.setAttribute("y2", lineAfter.getAttribute("y2"));
                            lineAfter.parentNode.removeChild(lineAfter);
                        }
                    
                    
                    }
                    else
                    {
                        if(document.getElementsByClassName("means").length == 1)
                        {
                            //if there is only mean (one sample tests)
                            if(meanCircle.attr("fill") == meanColors["hover"])
                            {
                                meanCircle.attr("fill", meanColors["click"]);
                //                 compareMeans();
                            }
                            else
                            {
                                meanCircle.attr("fill", meanColors["normal"]);
                            }
                        }
                        else if(document.getElementsByClassName("completeLines").length < (document.getElementsByClassName("means").length - 1))
                        {
                            //if there are 2+ means            
                            meanCircle.attr("fill", meanColors["click"]);
        
                            //check if we are finishing an incomplete line here
                            if(document.getElementsByClassName("incompleteLines").length > 0)
                            {
                                var incompleteLines = d3.selectAll(".incompleteLines");
                
                                incompleteLines.attr("x2", meanCircle.attr("cx"))
                                               .attr("y2", meanCircle.attr("cy"))
                                               .attr("stroke", meanColors["click"])
                                               .attr("class", "completeLines");
                                       
                                removeElementsByClassName("indicator");
                                var canvas = d3.select("#plotCanvas");                                             
                            }
                            var means = document.getElementsByClassName("means");
                    
                            if(document.getElementsByClassName("completeLines").length < (document.getElementsByClassName("means").length - 1))
                            {
                                var canvas = d3.select("#plotCanvas");
            
                                canvas.append("line")
                                        .attr("x1", meanCircle.attr("cx"))
                                        .attr("y1", meanCircle.attr("cy"))
                                        .attr("x2", meanCircle.attr("cx"))
                                        .attr("y2", meanCircle.attr("cy"))
                                        .attr("stroke", meanColors["normal"])
                                        .attr("stroke-dasharray", "5,5")
                                        .attr("id", meanCircle.attr("id"))
                                        .attr("class", "incompleteLines");
                            }
                            else
                            {
                                //we are done
                //                 compareMeans();
                            }
                        }   
                    }
                
                    setSelectButtons();
                    setCompareNowButtonText();
                }
            }
    
            else if((e.button == 1 && window.event != null || e.button == 0) && target.className.baseVal == "compareNow")
            {
                d3.selectAll(".compareNow").attr("cursor", "pointer");
                
                var rButton = d3.select(".backButtonBack");
                
                rButton.attr("fill", "url(#buttonFillNormal)")
                        .attr("filter", "url(#Bevel)")
                        .attr("stroke", "black");
                    
                states.push({visualisation: currentVisualisationSelection, substate: "significanceTest"});
                
                //get selected means
                var means = document.getElementsByClassName("means");
                var selectedMeans = []; 
                var variableList = getSelectedVariables();
        
                for(var i=0; i<means.length; i++)
                {
                    if(means[i].getAttribute("fill") == meanColors["click"])
                        selectedMeans.push(means[i]);
                }
        
                if(selectedMeans.length == 2 || selectedMeans.length == means.length)
                {
                    compareMeans();
                    removeElementsByClassName("boxplotLegends");
                    removeElementsByClassName("compareNow");
                }
                else 
                {
                    alert("Please select means of two levels (or) select means of all the levels!");                    
                }
            }
    
            else if((e.button == 1 && window.event != null || e.button == 0) && target.className.baseVal == "compareMean")
            {
                setup(e, target);
        
                pairwiseComparisons = false;
                
                states.push({visualisation: currentVisualisationSelection, substate: "base"});
                states.push({visualisation: currentVisualisationSelection, substate: "meanSelection"});
        
                var canvas = d3.select("#plotCanvas");
                var variableList = getSelectedVariables();
        
                var inText = "COMPARE SELECTED MEANS";
    
                drawButtonInSideBar(inText, "compareNow");
            
                var availableWidth = canvasWidth;
            
                canvas.append("rect")
                        .attr("x", availableWidth/3 - selectionButtonWidth/2)
                        .attr("y", selectionButtonOffset)
                        .attr("height", selectionButtonHeight)
                        .attr("width", selectionButtonWidth)
                        .attr("rx", scaleForWindowSize(10) + "px")
                        .attr("ry", scaleForWindowSize(10) + "px")
                        .attr("fill", "url(#buttonFillSelected)")
                        .attr("filter", "none")
                        .attr("stroke", "none")
                        .attr("id", "rect")
                        .attr("class", "selectNone");
                    
                canvas.append("text")
                        .attr("x", availableWidth/3)
                        .attr("y", selectionButtonOffset + selectionButtonHeight/2 + yAxisTickTextOffset)
                        .attr("fill", "white")
                        .attr("text-anchor", "middle")
                        .attr("font-size", fontSizeButtonLabel + "px")
                        .text("SELECT NONE")
                        .attr("id", "text")
                        .attr("class", "selectNone");
            
                canvas.append("rect")
                        .attr("x", 2*availableWidth/3 - selectionButtonWidth/2)
                        .attr("y", selectionButtonOffset)
                        .attr("height", selectionButtonHeight)
                        .attr("width", selectionButtonWidth)
                        .attr("rx", scaleForWindowSize(10) + "px")
                        .attr("ry", scaleForWindowSize(10) + "px")
                        .attr("fill", "url(#buttonFillNormal)")
                        .attr("filter", "url(#Bevel)")
                        .attr("stroke", "black")
                        .attr("id", "rect")
                        .attr("class", "selectAll");
                    
                canvas.append("text")
                        .attr("x", 2*availableWidth/3)
                        .attr("y", selectionButtonOffset + selectionButtonHeight/2 + yAxisTickTextOffset)
                        .attr("fill", "black")
                        .attr("text-anchor", "middle")
                        .attr("font-size", fontSizeButtonLabel + "px")
                        .text("SELECT ALL")
                        .attr("id", "text")
                        .attr("class", "selectAll");
        
                freezeMouseEvents = true;
                d3.selectAll(".IQRs, .medians, .TOPFringes, .BOTTOMFringes, .TOPFringeConnectors, .BOTTOMFringeConnectors, .outliers, .CIs, .CITopFringes, .CIBottomFringes").transition().duration(500).style("opacity", "0.2");
                d3.selectAll(".means").transition().duration(500).attr("r", engorgedMeanRadius);
            
                setTimeout(function()
                {
                    freezeMouseEvents = false;
                }, 500);
        
                removeElementsByClassName("compareMean");
            }
        
            else if((e.button == 1 && window.event != null || e.button == 0) && target.className.baseVal == "selectNone")
            {
                setup(e, target);
            
                var selectNoneText = d3.select("#text.selectNone");
                var selectNoneButton = d3.select("#rect.selectNone");
            
                var selectAllText = d3.select("#text.selectAll");
                var selectAllButton = d3.select("#rect.selectAll");
            
                if(selectNoneButton.attr("fill") == "url(#buttonFillNormal)")
                {
                    selectNoneButton.attr("fill", "url(#buttonFillSelected)");
                    selectNoneButton.attr("filter", "none");
                    selectNoneButton.attr("stroke", "none");
                
                    selectNoneText.attr("fill", "white");
                
                    unselectAllMeans();
                
                    selectAllButton.attr("fill", "url(#buttonFillNormal)");
                    selectAllButton.attr("filter", "url(#Bevel)");
                    selectAllButton.attr("stroke", "black");
                
                    selectAllText.attr("fill", "black");
                
                    setTimeout(function()
                    {
                        setCompareNowButtonText();
                    }, 500);
                }
            }
        
            else if((e.button == 1 && window.event != null || e.button == 0) && target.className.baseVal == "selectAll")
            {
                setup(e, target);
            
                var selectNoneText = d3.select("#text.selectNone");
                var selectNoneButton = d3.select("#rect.selectNone");
            
                var selectAllText = d3.select("#text.selectAll");
                var selectAllButton = d3.select("#rect.selectAll");
            
                if(selectAllButton.attr("fill") == "url(#buttonFillNormal)")
                {
                    selectAllButton.attr("fill", "url(#buttonFillSelected)");
                    selectAllButton.attr("filter", "none");
                    selectAllButton.attr("stroke", "none");
                
                    selectAllText.attr("fill", "white");
                
                    selectAllMeans();
                
                    selectNoneButton.attr("fill", "url(#buttonFillNormal)");
                    selectNoneButton.attr("filter", "url(#Bevel)");
                    selectNoneButton.attr("stroke", "black");
                
                    selectNoneText.attr("fill", "black");
                
                    setTimeout(function()
                    {
                        setCompareNowButtonText();
                    }, 1000);
                }
            }
    
            else if((e.button == 1 && window.event != null || e.button == 0) && target.className.baseVal == "doPairwiseTest")
            {
                var rButton = d3.select(".backButtonBack");
                
                rButton.attr("fill", "url(#buttonFillNormal)")
                        .attr("filter", "url(#Bevel)")
                        .attr("stroke", "black");
                    
                d3.selectAll(".doPairwiseTest").attr("cursor", "pointer");
        
                //get selected means
                var means = document.getElementsByClassName("means");
                var selectedMeans = []; 
                var variableList = getSelectedVariables();
        
                for(var i=0; i<means.length; i++)
                {
                    if(means[i].getAttribute("fill") == meanColors["click"])
                        selectedMeans.push(means[i]);
                }
        
                if(selectedMeans.length != 2)
                {
                    alert("select two means then press compare");
                }
                else
                {
                    removeElementsByClassName("doPairwiseTest");
                    removeElementsByClassName("boxplotLegends");
                    compareMeans();
                }
            }
    
            else if((e.button == 1 && window.event != null || e.button == 0) && target.className.baseVal == "transformToNormal")
            {
                setup(e, target);
                
                removeElementsByClassName("transformToNormal");
            
                var variableList = sort(currentVariableSelection);
        
                for(var i=0; i<variableList["independent-levels"].length; i++)
                {    
                    applyNormalityTransform(variableList["dependent"][0], variableList["independent-levels"][i], false);
                }
        
                applyNormalityTransform(variableList["dependent"][0], "dataset", true);               
            }
        
            else if((e.button == 1 && window.event != null || e.button == 0) && target.className.baseVal == "transformToHomogeneity")
            {
                setup(e, target);
        
                var button = d3.select("#button." + target.className.baseVal);   
                var buttonText = d3.select("#text." + target.className.baseVal);        
        
                removeElementsByClassName("transformToHomogeneity");
            
                var variableList = sort(currentVariableSelection);
            
                applyHomogeneityTransform(variableList["dependent"][0], variableList["independent"][0]);               
            }
    
            else if((e.button == 1 && window.event != null || e.button == 0) && target.className.baseVal == "fullscreen")
            {
                _startX = e.clientX;
                _startY = e.clientY;
        
                _dragElement = target;
        
                document.onmousemove = OnMouseMove;
                document.body.focus();

                document.onselectstart = function () { return false; };

                target.ondragstart = function() { return false; };
        
                var button = d3.select(".fullscreen");
        
                if(button.attr("xlink:href") == "images/fullscreennormal.png")
                {
                    fullScreen = true;
                    button.attr("xlink:href", "images/fullscreenclick.png");
                    d3.select("#variable.panel").attr("style", "width: " + 0 + "px; height: " + height + "px;"); 
                    d3.select("#variablePanelSVG").attr("width", 0);            
                    d3.select("#visualisation.panel").attr("style", "height: " + 0 + "px;"); 
                    d3.select("#visualisationPanelSVG").attr("height", 0);
                    d3.select("#canvas").attr("style", "left: 0px; height: " + height + "px;");
                    d3.select("#plotCanvas").attr("height", height).attr("width", width-sideBarWidth);
                }
                else if(button.attr("xlink:href") == "images/fullscreenclick.png")
                {
                    fullScreen = false;
                    button.attr("xlink:href", "images/fullscreennormal.png");
                    d3.select("#variable.panel").attr("style", "width: " + (width - canvasWidth - sideBarWidth) + "px; height: " + height + "px;"); 
                    d3.select("#variablePanelSVG").attr("width", (width - canvasWidth - sideBarWidth));            
                    d3.select("#visualisation.panel").attr("style", "width: " + (canvasWidth + sideBarWidth) + "px; height: " + height/4 + "px; top: " + canvasHeight + "px; left: " + (width - canvasWidth - sideBarWidth) + "px;");                    
                    d3.select("#visualisationPanelSVG").attr("height", height/4);
                    d3.select("#canvas").attr("style", "position: absolute; width: " + canvasWidth + "px; height: " + canvasHeight + "px; top: 0px; left: " + (width - canvasWidth - sideBarWidth) + "px;");    
                    d3.select("#plotCanvas").attr("height", canvasHeight).attr("width", canvasWidth);
                }
            }
        
            else if((e.button == 1 && window.event != null || e.button == 0) && target.className.baseVal == "helpButtonFront")
            {
                setup(e, target);
            
                var helpButton = d3.select(".helpButtonBack");
                var helpButtonText = d3.select(".helpButtonText");
            
                if(helpButton.attr("stroke") == "black")
                {
                    help = true;
                    helpButton.attr("fill", "url(#buttonFillSelected)")
                                .attr("filter", "none")
                                .attr("stroke", "none");
                
                    helpButtonText.attr("fill", "white");
            
                    var description = d3.select("body").append("div");                
                    description.attr("id", "descriptionPanel")
                         .attr("style", "width: " + width + "px; height: " + (height - canvasHeight) + "px; top: " + canvasHeight + "px;");
                    
                    description.append("label")
                                .attr("id", "descriptionLabel")
                                .text("Hover over a visible element to get help");
                    
                    //plotCanvas
                    var plotCanvas = d3.select("#plotCanvas");
                    var sideBar = d3.select("#sideBarCanvas");
                    
                    if(document.getElementById("regressionLine") == null)
                    {
                        plotCanvas.append("rect")
                                    .attr("x", canvasWidth/2 - plotWidth/2)
                                    .attr("y", canvasHeight/2 - plotHeight/2)
                                    .attr("width", plotWidth)
                                    .attr("height", plotHeight)
                                    .attr("rx", "10px")
                                    .attr("ry", "10px")
                                    .attr("fill", "white")
                                    .attr("stroke", "orange")
                                    .attr("opacity", "0.01")
                                    .attr("class", "plotHelp");  
                    }
                    
                    if(document.getElementsByClassName("significanceTest").length > 0)
                    {
                        sideBar.append("rect")
                                    .attr("x", scaleForWindowSize(10))
                                    .attr("y", significanceTestResultOffsetTop + 3*significanceTestResultStep - significanceTestResultStep/2)
                                    .attr("height", significanceTestResultStep)
                                    .attr("width", sideBarWidth - 2*scaleForWindowSize(10))
                                    .attr("rx", "3px")
                                    .attr("ry", "3px")
                                    .attr("stroke", "none")
                                    .attr("opacity", "0.01")
                                    .attr("fill", "white")
                                    .attr("class", "pValueHelp");
                                    
                        sideBar.append("rect")
                                    .attr("x", scaleForWindowSize(10))
                                    .attr("y", significanceTestResultOffsetTop + 2*significanceTestResultStep - significanceTestResultStep/2)
                                    .attr("height", significanceTestResultStep)
                                    .attr("width", sideBarWidth - 2*scaleForWindowSize(10))
                                    .attr("rx", "3px")
                                    .attr("ry", "3px")
                                    .attr("stroke", "none")
                                    .attr("opacity", "0.01")
                                    .attr("fill", "white")
                                    .attr("class", "testStatisticHelp");
                                    
                        sideBar.append("rect")
                                    .attr("x", scaleForWindowSize(10))
                                    .attr("y", significanceTestResultOffsetTop + significanceTestResultStep - significanceTestResultStep/2)
                                    .attr("height", significanceTestResultStep)
                                    .attr("width", sideBarWidth - 2*scaleForWindowSize(10))
                                    .attr("rx", "3px")
                                    .attr("ry", "3px")
                                    .attr("stroke", "none")
                                    .attr("opacity", "0.01")
                                    .attr("fill", "white")
                                    .attr("class", "methodHelp");
                        
                        sideBar.append("rect")
                                    .attr("x", scaleForWindowSize(10))
                                    .attr("y", significanceTestResultOffsetTop - significanceTestResultStep - effectSizeHeight/2 - yAxisTickTextOffset)
                                    .attr("height", effectSizeHeight + yAxisTickTextOffset*2)
                                    .attr("width", sideBarWidth - 2*scaleForWindowSize(10))
                                    .attr("rx", "3px")
                                    .attr("ry", "3px")
                                    .attr("stroke", "none")
                                    .attr("opacity", "0.01")
                                    .attr("fill", "white")
                                    .attr("class", "effectSizeHelp");
                    }
                    
                    
                    if(d3.select("#homogeneity.assumptionsButtonBack").attr("stroke") != "black")
                    {
                        var variancePlotWidth = plotWidth/2;
                        var variancePlotHeight = scaleForWindowSize(250);
                        
                        plotCanvas.append("rect")
                                    .attr("x", canvasWidth/2 - variancePlotWidth/2 - scaleForWindowSize(10))
                                    .attr("y", canvasHeight/2 + plotHeight/2 + 3*axesOffset - scaleForWindowSize(10))
                                    .attr("height", variancePlotHeight + 2*scaleForWindowSize(10))
                                    .attr("width", variancePlotWidth + 2*scaleForWindowSize(10))
                                    .attr("rx", "5px")
                                    .attr("ry", "5px")
                                    .attr("fill", "white")
                                    .attr("stroke", "orange")
                                    .attr("opacity", "0.01")
                                    .attr("class", "variancePlotHelp");
                    }
                    
                    if(d3.select("#normality.assumptionsButtonBack").attr("stroke") != "black")
                    {   
                        plotCanvas.append("rect")
                                    .attr("x", canvasWidth/2 - plotWidth/2)
                                    .attr("y", canvasHeight + normalityPlotOffset - 2*scaleForWindowSize(10))
                                    .attr("height", normalityPlotHeight + 4*scaleForWindowSize(10))
                                    .attr("width", plotWidth)
                                    .attr("rx", "5px")
                                    .attr("ry", "5px")
                                    .attr("fill", "white")
                                    .attr("stroke", "orange")
                                    .attr("opacity", "0.01")
                                    .attr("class", "normalityPlotHelp");
                    }                   
                }                
            }
            
            else if((e.button == 1 && window.event != null || e.button == 0) && target.className.baseVal == "backButtonFront")
            {
                setup(e, target);
                
                var rButton = d3.select(".backButtonBack");
                
                if(currentVisualisationSelection == "Boxplot" && rButton.attr("stroke") == "black")
                {
                    plotVisualisation();
                
                    d3.select(".backButtonBack").attr("fill", "grey")
                                                .attr("filter", "none")
                                                .attr("stroke", "none");

                    var canvas = d3.select("#plotCanvas");
                    var variableList = getSelectedVariables();
        
                    var inText = "COMPARE SELECTED MEANS";
    
                    if(pairwiseComparisons)
                        drawButtonInSideBar("DO PAIRWISE TEST", "doPairwiseTest");
                    else
                        drawButtonInSideBar(inText, "compareNow");
            
                    var availableWidth = canvasWidth;
                    
                    if(!pairwiseComparisons)
                    {
                        canvas.append("rect")
                                .attr("x", availableWidth/3 - selectionButtonWidth/2)
                                .attr("y", selectionButtonOffset)
                                .attr("height", selectionButtonHeight)
                                .attr("width", selectionButtonWidth)
                                .attr("rx", scaleForWindowSize(10) + "px")
                                .attr("ry", scaleForWindowSize(10) + "px")
                                .attr("fill", "url(#buttonFillSelected)")
                                .attr("filter", "none")
                                .attr("stroke", "none")
                                .attr("id", "rect")
                                .attr("class", "selectNone");
                    
                        canvas.append("text")
                                .attr("x", availableWidth/3)
                                .attr("y", selectionButtonOffset + selectionButtonHeight/2 + yAxisTickTextOffset)
                                .attr("fill", "white")
                                .attr("text-anchor", "middle")
                                .attr("font-size", fontSizeButtonLabel + "px")
                                .text("SELECT NONE")
                                .attr("id", "text")
                                .attr("class", "selectNone");
            
                        canvas.append("rect")
                                .attr("x", 2*availableWidth/3 - selectionButtonWidth/2)
                                .attr("y", selectionButtonOffset)
                                .attr("height", selectionButtonHeight)
                                .attr("width", selectionButtonWidth)
                                .attr("rx", scaleForWindowSize(10) + "px")
                                .attr("ry", scaleForWindowSize(10) + "px")
                                .attr("fill", "url(#buttonFillNormal)")
                                .attr("filter", "url(#Bevel)")
                                .attr("stroke", "black")
                                .attr("id", "rect")
                                .attr("class", "selectAll");
                    
                        canvas.append("text")
                                .attr("x", 2*availableWidth/3)
                                .attr("y", selectionButtonOffset + selectionButtonHeight/2 + yAxisTickTextOffset)
                                .attr("fill", "black")
                                .attr("text-anchor", "middle")
                                .attr("font-size", fontSizeButtonLabel + "px")
                                .text("SELECT ALL")
                                .attr("id", "text")
                                .attr("class", "selectAll");
                    }
        
                    freezeMouseEvents = true;
                    d3.selectAll(".IQRs, .medians, .TOPFringes, .BOTTOMFringes, .TOPFringeConnectors, .BOTTOMFringeConnectors, .outliers, .CIs, .CITopFringes, .CIBottomFringes").transition().duration(500).style("opacity", "0.2");
                    d3.selectAll(".means").transition().duration(500).attr("r", engorgedMeanRadius);
            
                    setTimeout(function()
                    {
                        freezeMouseEvents = false;
                    }, 500);
        
                    removeElementsByClassName("compareMean");
                }
            }
    
            else if((e.button == 1 && window.event != null || e.button == 0) && target.className.baseVal == "regression")
            {
                setup(e, target);
                removeElementsByClassName("regression");
        
                drawDialogBoxToGetOutcomeVariable();
            }
    
            else if((e.button == 1 && window.event != null || e.button == 0) && target.className.baseVal == "outcomeVariable")
            {
                setup(e, target);
        
                var outcomeVariableButton = d3.select("#" + target.id + ".outcomeVariable");
        
                var choice = target.id;
        
                if(currentVisualisationSelection == "Scatterplot")
                {
                    if(choice != currentVariableSelection[1])
                    {   
                        var temp = currentVariableSelection[1];
                        currentVariableSelection[1] = currentVariableSelection[0];
                        currentVariableSelection[0] = temp;
                
                        plotVisualisation();  
                    }
        
                    var variableList = sort(currentVariableSelection);
        
                        console.log("\n\t\tFinding the regression model to predict the outcome variable (" + currentVariableSelection[1] + ") from the explanatory variable (" + currentVariableSelection[0] + ")");
        
                        //some interaction to get the variables :)
        
                        removeElementsByClassName("outcomeVariable");
                        removeElementsByClassName("dialogBox");
        
                    setTimeout(function(){            
                        removeElementsByClassName("regression");
                        removeElementsByClassName("significanceTest");
                        removeElementsByClassName("effectSize");
                        getLinearModelCoefficients(currentVariableSelection[1], currentVariableSelection[0]);
                    }, 300);  
                }
                else if(currentVisualisationSelection == "Scatterplot-matrix")
                {
                    resetSVGCanvas();
                    drawFullScreenButton();
            
                    var explanatoryVariables = [];
                    var outcomeVariable = choice;
            
                    for(var i=0; i<currentVariableSelection.length; i++)
                    {
                        if(currentVariableSelection[i] != outcomeVariable)
                        {
                            explanatoryVariables.push(currentVariableSelection[i]);
                        }
                    }
                    if(explanatoryVariables.length == 1)
                    {
                        getLinearModelCoefficients(outcomeVariable, explanatoryVariables[0]);
                        currentVisualisationSelection = "Scatterplot";
                        plotVisualisation();
                    }
                    else
                        performMultipleRegression(outcomeVariable, explanatoryVariables);
                }
            }
    
            else if((e.button == 1 && window.event != null || e.button == 0) && target.className.baseVal == "interactionEffect")
            {
                setup(e, target);
        
                var button = d3.select("#button.interactionEffect");
                removeElementsByClassName("interactionEffect");
                
                var variableList = getSelectedVariables();
                
                states.push({variables: currentVariableSelection, substate: "other"});
                console.dir(states);
                
                findEffect(variableList["dependent"][0], variableList["independent"]);
            }
    
            else if((e.button == 1 && window.event != null || e.button == 0) && target.className.baseVal == "pairwisePostHoc")
            {
                setup(e, target);
        
                removeElementsByClassName("effectSize");
                removeElementsByClassName("parameter");
                removeElementsByClassName("significanceTest");
                removeElementsByClassName("differenceInMeans");
                removeElementsByClassName("checkingAssumptions");
                removeElementsByClassName("assumptions");
                removeElementsByClassName("assumptionsButtonFront");
                removeElementsByClassName("assumptionsButtonBack");
                removeElementsByClassName("ticks");
                removeElementsByClassName("crosses");
                removeElementsByClassName("pairwisePostHoc");
                removeElementsByClassName("loading");
                removeElementsByClassName("selectNone");
                removeElementsByClassName("selectAll");
                removeElementsByClassName("effectSizeInterpretationIndicators");
                removeElementsByClassName("differenceInMeans");
                removeElementsByClassName("differenceInMeansText");
                removeElementsByClassName("differenceInMeansMain");
                removeElementsByClassName("densityCurve");
                
                removeElementById("border");
        
                pairwiseComparisons = true;
                
                states.push({variables: currentVariableSelection, substate: "pairwise"});
                console.dir(states);
        
                var variableList = getSelectedVariables();
                var canvas = d3.select("#plotCanvas");
                
                resetMeans();
    
                drawButtonInSideBar("COMPARE MEANS", "doPairwiseTest");
        
                d3.selectAll(".IQRs, .medians, .TOPFringes, .BOTTOMFringes, .TOPFringeConnectors, .BOTTOMFringeConnectors, .outliers, .CIs, .CITopFringes, .CIBottomFringes").transition().duration(500).style("opacity", "0.2");
                d3.selectAll(".means").transition().duration(500).attr("r", engorgedMeanRadius);
        
                removeElementsByClassName("compareMean");
            }
            
            else if((e.button == 1 && window.event != null || e.button == 0) && target.className.baseVal == "tukeyHSD")
            {
                setup(e, target);        
                var variableList = sort(currentVariableSelection);
                
                states.push({variables: currentVariableSelection, substate: "other"});
                console.dir(states);
        
                if(variableList["independent"].length == 1)
                {
                    performTukeyHSDTestOneIndependentVariable(variableList["dependent"][0], variableList["independent"][0]);
                }
                else if(variableList["independent"].length == 2)
                {
                    performTukeyHSDTestTwoIndependentVariables(variableList["dependent"][0], variableList["independent"][0], variableList["independent"][1]);
                }
            }
        
            else if((e.button == 1 && window.event != null || e.button == 0) && target.className.baseVal == "assumptionsButtonFront")
            {
                setup(e, target);
        
                var assumptionText = d3.select("#" + target.id + ".assumptions");
                var assumptionButton = d3.select("#" + target.id + ".assumptionsButtonBack");
            
                if(assumptionButton.attr("stroke") == "black")
                {
                    assumptionButton.attr("fill", "url(#buttonFillSelected)")
                                    .attr("filter", "none")
                                    .attr("stroke", "none");
            
                    assumptionText.attr("fill", "white");
            
                    switch(target.id)
                    {
                        case "normality":
                                        {
                                            removeElementsByClassName("densityCurve");
                                            var homogeneityText = d3.select("#homogeneity.assumptions");
                                            var homogeneityButton = d3.select("#homogeneity.assumptionsButtonBack");
                                            
                                            homogeneityText.attr("fill", "black");
                                            homogeneityButton.attr("fill", "url(#buttonFillNormal)")
                                                                .attr("filter", "url(#Bevel)")
                                                                .attr("stroke", "black");
                                                                
                                            var variableList = getSelectedVariables();
                                    
                                            var dependentVariable = variableList["dependent"][0];
        
                                            for(var i=0; i<variableList["independent-levels"].length; i++)
                                            {   
                                                if(distributions[dependentVariable][variableList["independent-levels"][i]] == false)
                                                {                                
                                                    d3.select("#plotCanvas").transition().duration(1000).attr("viewBox", "0 0 " + canvasWidth + " " + canvasHeight*1.5);
                
                                                    //draw boxplots in red 
                                                    drawBoxPlotInRed(variableList["independent-levels"][i]);
                                                    drawNormalityPlot(dependentVariable, variableList["independent-levels"][i], "notnormal");
                                                }
                                                else
                                                {
                                                    d3.select("#plotCanvas").transition().duration(1000).attr("viewBox", "0 0 " + canvasWidth + " " + canvasHeight*1.5);
                 
                                                    drawNormalityPlot(dependentVariable, variableList["independent-levels"][i], "normal");
                                                }
                                            }
                                    
                                            break;
                                        }
                        case "homogeneity":
                                        {
                                            var normalityText = d3.select("#normality.assumptions");
                                            var normalityButton = d3.select("#normality.assumptionsButtonBack");
                                            
                                            normalityText.attr("fill", "black");
                                            normalityButton.attr("fill", "url(#buttonFillNormal)")
                                                                .attr("filter", "url(#Bevel)")
                                                                .attr("stroke", "black");
                                                                
                                            var variableList = sort(currentVariableSelection);
                                    
                                            var dependentVariable = variableList["dependent"][0];
                                            
                                            var homogeneity = d3.select("#homogeneity.ticks").attr("display") == "inline" ? true : false;
        
                                            for(var i=0; i<variableList["independent"].length; i++)
                                            {                   
                                                d3.select("#plotCanvas").transition().duration(1000).attr("viewBox", "0 0 " + canvasWidth + " " + canvasHeight*1.5);
        
                                                drawHomogeneityPlot(homogeneity);                                           
                                            }
                                            break;
                                        }
                        case "sphericity":
                                        {                                    
                                            break;
                                        }
                        default: 
                                alert("this is not supposed to happen!");
                    }
                }
                else
                {
                    assumptionButton.attr("fill", "url(#buttonFillNormal)")
                                    .attr("filter", "url(#Bevel)")
                                    .attr("stroke", "black");
            
                    assumptionText.attr("fill", "black");
            
                    switch(target.id)
                    {
                        case "normality":
                                        {
                                            d3.select("#plotCanvas").transition().duration(1000).attr("viewBox", "0 0 " + canvasWidth + " " + canvasHeight);
                                    
                                            break;
                                        }
                        case "homogeneity":
                                        {
                                            d3.select("#plotCanvas").transition().duration(1000).attr("viewBox", "0 0 " + canvasWidth + " " + canvasHeight);
                                        
                                            break;
                                        }
                        case "sphericity":
                                        {
                                            console.log("To be done!");
                                    
                                            break;
                                        }
                        default: 
                                alert("this is not supposed to happen!");
                    }
                }
            }
            
            else if((e.button == 1 && window.event != null || e.button == 0) && target.className.baseVal == "effectButtonFront")
            {
                setup(e, target);
                
                var effectButton = d3.select("#" + target.id + ".effectButtonBack");
                var effectButtonText = d3.select("#" + target.id + ".effectButtonText");
                
                var sideBar = d3.select("#sideBarCanvas");
                var index = parseFloat(effectButton.attr("data-index"));
                
                if(effectButton.attr("stroke") == "black")
                {
                    d3.selectAll(".effectButtonBack").attr("fill", "url(#buttonFillNormal)").attr("stroke", "black");
                    d3.selectAll(".effectButtonText").attr("fill", "black");
                    
                    effectButton.attr("fill", "url(#buttonFillSelected)")
                                .attr("stroke", "none");
                    
                    effectButtonText.attr("fill", "white");
                    
                    removeElementsByClassName("significanceTest");
                    removeElementsByClassName("effectSize");
                    removeElementsByClassName("parameter");
                    
                    sideBar.append("text")
                            .attr("x", sideBarWidth/2)
                            .attr("y", significanceTestResultOffsetTop + significanceTestResultStep)
                            .attr("text-anchor", "middle")
                            .attr("font-size", fontSizeSignificanceTestResults + "px")
                            .attr("fill", "#627bf4")
                            .text(testResults["method"])
                            .attr("class", "significanceTest");
                    
                    drawParameter(testResults["df"][index], parseFloat(testResults["parameter"][index]));
    
                    sideBar.append("text")
                            .attr("x", sideBarWidth/2)
                            .attr("y", significanceTestResultOffsetTop + 3*significanceTestResultStep)
                            .attr("text-anchor", "middle")
                            .attr("font-size", fontSizeSignificanceTestResults + "px")
                            .attr("fill", "#627bf4")
                            .text(testResults["p"][index])
                            .attr("class", "significanceTest");
    
    
                    //Effect sizes
                    drawEffectSize(parseFloat(testResults["effect-size"][index]));
                }
            }
            
            else if((e.button == 1 && window.event != null || e.button == 0) && target.className.baseVal == "stateForNavigation")
            {
                setup(e, target);
                
                d3.selectAll(".stateForNavigation").attr("fill", "url(#buttonFillNormal)").attr("filter", "url(#Bevel)").attr("stroke", "black");
                d3.selectAll(".stateForNavigationText").attr("fill", "black");                
                
                var button = d3.select("#" + target.id + ".stateForNavigation");
                var buttonText = d3.select("#" + target.id + ".stateForNavigationText");
                
                if(button.attr("stroke") == "black")
                {
                    button.attr("fill", "url(#buttonFillSelected)")
                            .attr("filter", "none")
                            .attr("stroke", "none");
                    
                    buttonText.attr("fill", "white");
                    
                    switch(currentVisualisationSelection)
                    {
                        case "Boxplot":
                                        {
                                            switch(target.id)
                                            {
                                                case "significance test":
                                                                        {
                                                                            var canvas = d3.select("#plotCanvas");
                                                                            var variableList = getSelectedVariables();
        
                                                                            var inText = "COMPARE NOW";
    
                                                                            drawButtonInSideBar(inText, "compareNow");
            
                                                                            var availableWidth = canvasWidth;
            
                                                                            canvas.append("rect")
                                                                                    .attr("x", availableWidth/3 - selectionButtonWidth/2)
                                                                                    .attr("y", selectionButtonOffset)
                                                                                    .attr("height", selectionButtonHeight)
                                                                                    .attr("width", selectionButtonWidth)
                                                                                    .attr("rx", scaleForWindowSize(10) + "px")
                                                                                    .attr("ry", scaleForWindowSize(10) + "px")
                                                                                    .attr("fill", "url(#buttonFillSelected)")
                                                                                    .attr("filter", "none")
                                                                                    .attr("stroke", "none")
                                                                                    .attr("id", "rect")
                                                                                    .attr("class", "selectNone");
                    
                                                                            canvas.append("text")
                                                                                    .attr("x", availableWidth/3)
                                                                                    .attr("y", selectionButtonOffset + selectionButtonHeight/2 + yAxisTickTextOffset)
                                                                                    .attr("fill", "white")
                                                                                    .attr("text-anchor", "middle")
                                                                                    .attr("font-size", fontSizeButtonLabel + "px")
                                                                                    .text("SELECT NONE")
                                                                                    .attr("id", "text")
                                                                                    .attr("class", "selectNone");
            
                                                                            canvas.append("rect")
                                                                                    .attr("x", 2*availableWidth/3 - selectionButtonWidth/2)
                                                                                    .attr("y", selectionButtonOffset)
                                                                                    .attr("height", selectionButtonHeight)
                                                                                    .attr("width", selectionButtonWidth)
                                                                                    .attr("rx", scaleForWindowSize(10) + "px")
                                                                                    .attr("ry", scaleForWindowSize(10) + "px")
                                                                                    .attr("fill", "url(#buttonFillNormal)")
                                                                                    .attr("filter", "url(#Bevel)")
                                                                                    .attr("stroke", "black")
                                                                                    .attr("id", "rect")
                                                                                    .attr("class", "selectAll");
                    
                                                                            canvas.append("text")
                                                                                    .attr("x", 2*availableWidth/3)
                                                                                    .attr("y", selectionButtonOffset + selectionButtonHeight/2 + yAxisTickTextOffset)
                                                                                    .attr("fill", "black")
                                                                                    .attr("text-anchor", "middle")
                                                                                    .attr("font-size", fontSizeButtonLabel + "px")
                                                                                    .text("SELECT ALL")
                                                                                    .attr("id", "text")
                                                                                    .attr("class", "selectAll");
        
                                                                            freezeMouseEvents = true;
                                                                            d3.selectAll(".IQRs, .medians, .TOPFringes, .BOTTOMFringes, .TOPFringeConnectors, .BOTTOMFringeConnectors, .outliers, .CIs, .CITopFringes, .CIBottomFringes").transition().duration(500).style("opacity", "0.2");
                                                                            d3.selectAll(".means").transition().duration(500).attr("r", engorgedMeanRadius);
            
                                                                            setTimeout(function()
                                                                            {
                                                                                freezeMouseEvents = false;
                                                                            }, 500);
        
                                                                            removeElementsByClassName("compareMean");
                                                                            
                                                                            break;
                                                                        }
                                            }
                                            
                                            break;                                            
                                        }
                        
                    }
                }
            }
    
            else
            {
                //the user clicked outside
                removeElementsByClassName("regressionPrediction");   
            }
        }
    }
}

function OnMouseMove(e)
{
    if (e == null) 
    var e = window.event; 

    // this is the actual "drag code"
    
    
    if(_dragElement != undefined)
    {
        var incompleteLines = d3.selectAll(".incompleteLines");
        // if((_dragElement.className.baseVal == 'means') && (document.getElementsByClassName("incompleteLines").length > 0) && incompleteLines.attr("stroke") == meanColors["normal"])
//         {
//             if(!fullScreen)
//             {
//                 incompleteLines.attr("x2", e.pageX - (width - canvasWidth - sideBarWidth))
//                         .attr("y2", e.pageY);
//             }
//             else
//             {
//                 incompleteLines.attr("x2", (e.pageX/(width - sideBarWidth)) * canvasWidth)
//                         .attr("y2", (e.pageY/height) * canvasHeight);
//             }
//         }
        if(_dragElement.id == "regressionLine")
        {
//             var regressionPoint = d3.select(".regressionPrediction");
//             
//             var xLine = d3.select("#x.lineToAxis");
//             var yLine = d3.select("#y.lineToAxis");
//             
//             var mouseX = toModifiedViewBoxForRegressionLineXCoordinate(e.pageX);
//             var mouseY = toModifiedViewBoxForRegressionLineYCoordinate(e.pageY);
//             
// //             xLine.attr("x1", ((height - mouseY) + testResults["intercept"])/testResults["slope"])
// //                                  .attr("y1", mouseY)                                                 
// //                                  .attr("y2", mouseY);
// //                          
// //             mouseX = ((canvasHeight - mouseY) + testResults["intercept"])/testResults["slope"];
// //             
// //     
// //             yLine.attr("x1", mouseX)
// //                  .attr("y1", height - (testResults["slope"]*mouseX - testResults["intercept"]))
// //                  .attr("x2", mouseX);
// 
// //             mouseY = toModifiedViewBoxForRegressionLineYCoordinate(testResults["slope"]*mouseX + testResults["intercept"]);
//             
//             mouseX = toModifiedViewBoxForRegressionLineXCoordinate(LEFT + getValue1(testResults["slope"]*(canvasHeight - mouseY) + testResults["intercept"], mins["X"], maxs["X"])*plotWidth);
//             
//             var canvas = d3.select("#plotCanvas");
//             
//             var dT = d3.select("#dummyText");
//             dT.text("X = " + mouseX + " , Y = " + mouseY);
//             
//             
//             regressionPoint.attr("cx", mouseX)
//                            .attr("cy", mouseY);
        }
        
    }

}

function OnMouseOver(e)			
{
    // IE is retarded and doesn't pass the event object
    if (e == null) 
            e = window.event; 

    // IE uses srcElement, others use target
    var target = e.target != null ? e.target : e.srcElement;
    // for IE, left click == 1
    // for Firefox, left click == 0
    
    if(!freezeMouseEvents)
    {
        if(help)
        {
            if(target.className.baseVal == "plotHelp")
            {
                setup(e, target);
                
                var visualisation = currentVisualisationSelection;
                var helpText = d3.select("#descriptionLabel");
                
                
                if(visualisation == null || visualisation == undefined)
                {
                    helpText.text("Please select a variable to get started");
                }
                else
                {   
                    d3.select(".plotHelp").attr("opacity","0.3").attr("cursor", "help");
                    helpText.text(desc[visualisation]);                
                }
            }
            
            if(target.className.baseVal == "pValueHelp")
            {
                setup(e, target);
                var helpText = d3.select("#descriptionLabel");
                
                d3.select(".pValueHelp").attr("opacity","0.3").attr("cursor", "help");
                
                helpText.text(desc["p-value"]);                
            }
            
            if(target.className.baseVal == "testStatisticHelp")
            {
                setup(e, target);
                var helpText = d3.select("#descriptionLabel");
                
                d3.select(".testStatisticHelp").attr("opacity","0.3").attr("cursor", "help");
                
                helpText.text(desc["parameter"][testResults["parameter-type"]]);                
            }
            
            if(target.className.baseVal == "methodHelp")
            {
                setup(e, target);
                var helpText = d3.select("#descriptionLabel");
                
                d3.select(".methodHelp").attr("opacity","0.3").attr("cursor", "help");
                console.log(testResults["test-type"]);                
                
                helpText.text(desc["method"][testResults["test-type"]]);
            }
            
            if(target.className.baseVal == "effectSizeHelp")
            {
                setup(e, target);
                var helpText = d3.select("#descriptionLabel");
                
                d3.select(".effectSizeHelp").attr("opacity","0.3").attr("cursor", "help");
                helpText.text(desc["effect-size"][testResults["effect-size-type"]]);
            }
            
            if(target.className.baseVal == "variancePlotHelp")
            {
                setup(e, target);
                
                var visualisation = currentVisualisationSelection;
                var helpText = d3.select("#descriptionLabel");
                
                d3.select(".variancePlotHelp").attr("opacity","0.3").attr("cursor", "help");

                helpText.text(desc["variancePlot"]);                
            }
            
            if(target.className.baseVal == "normalityPlotHelp")
            {
                setup(e, target);
                
                var visualisation = currentVisualisationSelection;
                var helpText = d3.select("#descriptionLabel");
                
                d3.select(".normalityPlotHelp").attr("opacity","0.3").attr("cursor", "help");

                helpText.text(desc["normalityPlot"]);                
            }
            
            if(target.className.baseVal == "assumptionsButtonFront")
            {
                setup(e, target);
                var assumptionType = target.id;
                
                var helpText = d3.select("#descriptionLabel");
                
                d3.select("#" + assumptionType + ".assumptionsButtonBack").attr("stroke-width","2px");
                d3.select("#" + assumptionType + ".assumptionsButtonFront").attr("cursor", "help");
                
                helpText.text(desc["assumptions"][assumptionType]);
            }
            
            if(target.className.baseVal == "compareMean")
            {
                setup(e, target);
                var assumptionType = target.id;
                
                var helpText = d3.select("#descriptionLabel");
                
                d3.select("#button.compareMean").attr("stroke-width","2px").attr("cursor", "help");
                d3.select("#text.compareMean").attr("cursor", "help");
                
                helpText.text(desc["compareMean"]);   
            }
            
            if(target.className.baseVal == "compareNow")
            {
                setup(e, target);
                var assumptionType = target.id;
                
                var helpText = d3.select("#descriptionLabel");
                
                d3.select("#button.compareNow").attr("stroke-width","2px").attr("cursor", "help");
                d3.select("#text.compareNow").attr("cursor", "help");
                
                helpText.text(desc["compareNow"]);   
            }
            
            if(target.className.baseVal == "pairwisePostHoc")
            {
                setup(e, target);
                var assumptionType = target.id;
                
                var helpText = d3.select("#descriptionLabel");
                
                d3.select("#button.pairwisePostHoc").attr("stroke-width","2px").attr("cursor", "help");
                d3.select("#text.pairwisePostHoc").attr("cursor", "help");
                
                helpText.text(desc["pairwisePostHoc"]);   
            }
            
            if(target.className.baseVal == "tukeyHSD")
            {
                setup(e, target);
                var assumptionType = target.id;
                
                var helpText = d3.select("#descriptionLabel");
                
                d3.select("#button.tukeyHSD").attr("stroke-width","2px").attr("cursor", "help");
                d3.select("#text.tukeyHSD").attr("cursor", "help");
                
                helpText.text(desc["tukeyHSD"]);   
            }
            
            if(target.className.baseVal == "regression")
            {
                setup(e, target);
                var assumptionType = target.id;
                
                var helpText = d3.select("#descriptionLabel");
                
                d3.select("#button.regression").attr("stroke-width","2px").attr("cursor", "help");
                d3.select("#text.regression").attr("cursor", "help");
                
                helpText.text(desc["regression"]);   
            }
            
            if(target.id == "regressionLine")
            {
                setup(e, target);
                
                var helpText = d3.select("#descriptionLabel");
                
                d3.selectAll("#regressionLine").attr("stroke-width", "12px").attr("cursor", "help");
                
                helpText.text(desc["regressionLine"]);
            }
            
            if(target.id == "equation")
            {
                setup(e, target);
                
                var helpText = d3.select("#descriptionLabel");
                
                d3.selectAll("#equation").attr("fill", "lightorange").attr("cursor", "help");
                
                helpText.text(desc["equation"]);
            }
            
            if(target.className.baseVal == "interactionEffect")
            {
                setup(e, target);
                var assumptionType = target.id;
                
                var helpText = d3.select("#descriptionLabel");
                
                d3.select("#button.interactionEffect").attr("stroke-width","2px").attr("cursor", "help");
                d3.select("#text.interactionEffect").attr("cursor", "help");
                
                helpText.text(desc["interactionEffect"]);   
            }
            
            if(target.className.baseVal == "variableNameHolderFront")
            {
                setup(e, target);
                var varName = target.id;
                
                var helpText = d3.select("#descriptionLabel");
                
                d3.select("#" + varName + ".variableNameHolderBack").attr("stroke-width","2px");
                d3.select("#" + varName + ".variableNameHolderFront").attr("cursor", "help");
                
                helpText.text(desc["variables"][varName]);                
            }
        }
        else
        {
            if(target.className.baseVal == "variableNameHolderFront")
            {		
                setup(e, target);
        
                var variableNameHolder = d3.selectAll("#" + target.id + ".variableNameHolderFront");
                variableNameHolder.attr("cursor","pointer");
            }
    
            else if(target.className.baseVal == "visualisationHolderFront")
            {		
                setup(e, target);
        
                var visualisationHolder = d3.selectAll("#" + target.id + ".visualisationHolderFront");
                visualisationHolder.attr("cursor","pointer");
            }
    
            else if(target.className.baseVal == "variableTypeToggleButton")
            {
                // setup(e, target);
        
                // var toggleButton = d3.select("#" + target.id + ".variableTypeToggleButton");
        
                // toggleButton.attr("cursor", "pointer");
            }
    
            else if(target.className.baseVal == "dependentVariableButtonFront")
            {
                setup(e, target);
        
                var variableButton = d3.select("#" + target.id + ".dependentVariableButtonBack");
                //if not selected
                if(variableButton.attr("fill") != variableTypeButtonColors["dependent"]["selected"])
                {
                    d3.select("#" + target.id + "." + target.className.baseVal).attr("cursor", "pointer");
                }
                else
                {
                    d3.select("#" + target.id + "." + target.className.baseVal).attr("cursor", "default");
                }
            }
    
            else if(target.className.baseVal == "independentVariableButtonFront")
            {
                setup(e, target);
        
                var variableButton = d3.select("#" + target.id + ".independentVariableButtonBack");
                //if not selected
                if(variableButton.attr("fill") != variableTypeButtonColors["independent"]["selected"])
                {
                    d3.select("#" + target.id + "." + target.className.baseVal).attr("cursor", "pointer");
                }
                else
                {
                    d3.select("#" + target.id + "." + target.className.baseVal).attr("cursor", "default");
                }
            }
    
            else if(target.className.baseVal == "disabled")
            {
                setup(e, target);
        
                var variableHolder = d3.select("#" + target.id + ".disabled");
                variableHolder.attr("cursor", "pointer");
            }
    
            else if(target.className.baseVal == "means")
            {		
                setup(e, target);
        
                var meanCircle = d3.select("#" + target.id + ".means");                
        
                if(meanCircle.attr("r") == meanRadius)
                {                
                    meanCircle.attr("cursor", "default");
            
                    var plotCanvas = d3.select("#plotCanvas");
                    var L = canvasWidth/2 - plotWidth/2 - axesOffset;
            
                    var mouseX = e.pageX - (width - canvasWidth - sideBarWidth);
                    var mouseY = e.pageY;
            
                    plotCanvas.append("line")
                                .attr("x1", meanCircle.attr("cx"))
                                .attr("y1", meanCircle.attr("cy"))
                                .attr("x2", L)
                                .attr("y2", meanCircle.attr("cy"))
                                .attr("stroke-dasharray", "5,5")
                                .attr("stroke", meanColors["normal"])
                                .attr("class", "hover");
            
                    plotCanvas.append("text")
                                .attr("x", mouseX + 10)
                                .attr("y", mouseY + 15)
                                .attr("text-anchor", "start")
                                .text(dec2(getActualValue(meanCircle.attr("cy"))))
                                .attr("fill", meanColors["normal"])
                                .attr("class", "hover");
                        
                }   
                else
                {                
                    if((document.getElementsByClassName("completeLines").length+1 <= (document.getElementsByClassName("means").length)) || (document.getElementsByClassName("means").length == 1))
                    {      
                        meanCircle.attr("cursor","pointer");
                    
                        //change color of the mean circle
                        if(meanCircle.attr("fill") == meanColors["normal"])
                        {
                            startLoopAnimation(meanCircle);
                            meanCircle.attr("fill", meanColors["hover"]);
            
                            // startLoopAnimation(meanCircle);
            
                            var incompleteLines = d3.selectAll(".incompleteLines");
            
                            if(document.getElementsByClassName("incompleteLines").length > 0)
                            {
                                incompleteLines.attr("x2", meanCircle.attr("cx"))
                                                .attr("y2", meanCircle.attr("cy"))
                                                .attr("display", "inline")
                                                .attr("stroke", meanColors["hover"]);
                            }
                        }
                    }
                }
            }
    
            else if(target.className.baseVal == "compareNow")
            {
                setup(e, target);
            
                d3.selectAll(".compareNow").attr("cursor", "pointer");
            }    
    
            else if(target.className.baseVal == "compareMean")
            {
                setup(e, target);
            
                d3.selectAll(".compareMean").attr("cursor", "pointer");
            }    
        
            else if(target.className.baseVal == "selectAll")
            {
                setup(e, target);
            
                d3.selectAll(".selectAll").attr("cursor", "pointer");
            }
        
            else if(target.className.baseVal == "selectNone")
            {
                setup(e, target);
            
                d3.selectAll(".selectNone").attr("cursor", "pointer");
            }
        
            else if(target.className.baseVal == "assumptionsButtonFront")
            {
                setup(e, target);
            
                d3.selectAll("#" + target.id + ".assumptionsButtonFront").attr("cursor", "pointer");
            }
    
            else if(target.className.baseVal == "bins")
            {		
                setup(e, target);
        
                highlightBinWithId(target.id);
            }   
    
            else if(target.className.baseVal == "datapoints")
            {		
                setup(e, target);
    
                var datapoint = d3.select("#" + target.id + ".datapoints");
        
                datapoint.transition().duration(300).attr("r", "5px");
        
                var altScatterPlot = false;
                var text = new Array();
        
                //Get data, minimums and maximums for each selected variable
                for(var i=0; i<currentVariableSelection.length; i++)
                {   
                    if(variableRows[currentVariableSelection[i]] == false && currentVariableSelection.length > 1)
                    {
                        // Levels are needed when we have a independent variable and one or more dependent variables
                        levels = variables[currentVariableSelection[i]]["dataset"].unique();            
                        altScatterPlot = true;
                    }
                }
    
                for(var i=0; i<currentVariableSelection.length; i++)
                {        
                    if(altScatterPlot)
                    {
                        if(variableRows[currentVariableSelection[i]] != false)
                        {
                            //for the dependent variable(s)
                
                            for(var j=0; j<levels.length; j++)
                            {
                                // for each level of the independent variable, find the dependent variables                    
                    
                                text[j] = variables[currentVariableSelection[i]][levels[j]];
                            }
                        }  
                    }
                    else 
                    {               
                        text[i] = variables[currentVariableSelection[i]]["dataset"];                
                    }             
                }
        
                var mouseX = e.pageX - (width - canvasWidth - sideBarWidth);
                var mouseY = e.pageY;
        
                var canvas = d3.select("#plotCanvas");
                canvas.append("text")
                        .attr("x", mouseX + 10)
                        .attr("y", mouseY + 15)
                        .attr("fill", meanColors["normal"])
                        .text(text[0][removeAlphabetsFromString(datapoint.attr("id"))] + ", " + text[1][removeAlphabetsFromString(datapoint.attr("id"))])
                        .attr("class", "hoverText");
                
                var xLine = canvas.append("line")
                        .attr("x1", datapoint.attr("cx"))
                        .attr("y1", datapoint.attr("cy"))
                        .attr("x2", datapoint.attr("cx"))
                        .attr("y2", datapoint.attr("cy"))
                        .attr("stroke", meanColors["normal"])
                        .attr("stroke-dasharray", "5,5")
                        .attr("id", "x")
                        .attr("class", "hoverText");
        
                xLine.transition().duration(500).attr("x2", canvasWidth/2 - plotWidth/2 - axesOffset);
        
                var yLine = canvas.append("line")
                        .attr("x1", datapoint.attr("cx"))
                        .attr("y1", datapoint.attr("cy"))
                        .attr("x2", datapoint.attr("cx"))
                        .attr("y2", datapoint.attr("cy"))
                        .attr("stroke", meanColors["normal"])
                        .attr("stroke-dasharray", "5,5")
                        .attr("id", "y")
                        .attr("class", "hoverText");
        
                yLine.transition().duration(500).attr("y2", canvasHeight/2 + plotHeight/2 - topOffset + axesOffset);
                
        
            }   
    
            else if(target.className.baseVal == "transformToNormal")
            {
                setup(e, target);
                d3.selectAll(".transformToNormal").attr("cursor", "pointer");
            }
        
            else if(target.className.baseVal == "transformToHomogeneity")
            {
                setup(e, target);
                d3.selectAll(".transformToHomogeneity").attr("cursor", "pointer");
            }
    
            else if(target.className.baseVal == "fullscreen")
            {
                // grab the mouse position
                _startX = e.clientX;
                _startY = e.clientY;
                // we need to access the element in OnMouseMove
                _dragElement = target;

                // tell our code to start moving the element with the mouse
            //     document.onmousemove = OnMouseMove;

                // cancel out any text selections
                document.body.focus();

                // prevent text selection in IE
                document.onselectstart = function () { return false; };
                // prevent IE from trying to drag an image
                target.ondragstart = function() { return false; };
        
                var button = d3.select(".fullscreen");
                button.attr("cursor", "pointer");
            }
        
            else if(target.className.baseVal == "helpButtonFront")
            {
                setup(e, target);
            
                var helpButton = d3.select(".helpButtonFront");
                var helpButtonText = d3.select(".helpButtonText");
                
//                 if(currentState().substate = "base"
            
                helpButton.attr("cursor", "pointer");
                helpButtonText.attr("cursor", "pointer");
            } 
            
            else if(target.className.baseVal == "backButtonFront")
            {
                setup(e, target);
            
                var backButton = d3.select(".backButtonFront");
                var backButtonText = d3.select(".backButtonText");
            
                if(d3.select(".backButtonBack").attr("stroke") == "black")
                {
                    backButton.attr("cursor", "pointer");
                    backButtonText.attr("cursor", "pointer");
                }
                else
                {
                    backButton.attr("cursor", "default");
                    backButtonText.attr("cursor", "default");
                }
            } 
    
            else if(target.className.baseVal == "outliers")
            {
                setup(e, target);
                var canvas = d3.select("#plotCanvas");
                var outlier = d3.select("#" + target.id + ".outliers");
        
                var mouseX = e.pageX - (width - canvasWidth - sideBarWidth);
                var mouseY = e.pageY;
        
                outlier.attr("r", outlierRadius*2).attr("stroke", "yellow").attr("stroke-width", "2px");
                canvas.append("line")       
                        .attr("x1", outlier.attr("cx"))
                        .attr("y1", outlier.attr("cy"))
                        .attr("x2", canvasWidth/2 - plotWidth/2 - axesOffset)
                        .attr("y2", outlier.attr("cy"))
                        .attr("stroke-dasharray", "5,5")
                        .attr("stroke", "black")
                        .attr("class", "hover");    
        
                canvas.append("text")
                        .attr("x", mouseX + scaleForWindowSize(45))
                        .attr("y", mouseY + scaleForWindowSize(25))
                        .attr("text-anchor", "middle")
                        .text(dec2(getActualValue(outlier.attr("cy"))))
                        .attr("class", "hover");                
            }
    
            else if((target.className.baseVal == "TOPFringes") || (target.className.baseVal == "BOTTOMFringes"))
            {
                setup(e, target);
                var canvas = d3.select("#plotCanvas");
                var tFringe = d3.select("#" + target.id + ".TOPFringes");
                var bFringe = d3.select("#" + target.id + ".BOTTOMFringes");
        
                tFringe.attr("stroke-width", 4);
                bFringe.attr("stroke-width", 4);
        
                canvas.append("line")       
                        .attr("x1", tFringe.attr("x1"))
                        .attr("y1", tFringe.attr("y1"))
                        .attr("x2", canvasWidth/2 - plotWidth/2 - axesOffset)
                        .attr("y2", tFringe.attr("y1"))
                        .attr("stroke-dasharray", "5,5")
                        .attr("stroke", "black")
                        .attr("class", "hover");    
        
                 canvas.append("line")       
                        .attr("x1", bFringe.attr("x1"))
                        .attr("y1", bFringe.attr("y1"))
                        .attr("x2", canvasWidth/2 - plotWidth/2 - axesOffset)
                        .attr("y2", bFringe.attr("y1"))
                        .attr("stroke-dasharray", "5,5")
                        .attr("stroke", "black")
                        .attr("class", "hover");    
    
                canvas.append("text")
                        .attr("x", (parseFloat(tFringe.attr("x1")) + parseFloat(tFringe.attr("x2")))/2)
                        .attr("y", parseFloat(tFringe.attr("y1")) - displayOffsetTop)
                        .attr("text-anchor", "middle")
                        .text(dec2(getActualValue(tFringe.attr("y1"))))
                        .attr("class", "hover");
        
                canvas.append("text")
                        .attr("x", (parseFloat(bFringe.attr("x1")) + parseFloat(bFringe.attr("x2")))/2)
                        .attr("y", parseFloat(bFringe.attr("y1")) + displayOffsetBottom)
                        .attr("text-anchor", "middle")
                        .text(dec2(getActualValue(bFringe.attr("y1"))))
                        .attr("class", "hover");
                
            }
    
            else if((target.className.baseVal == "CIs") || (target.className.baseVal == "CITopFringes") || (target.className.baseVal == "CIBottomFringes"))
            {
                var canvas = d3.select("#plotCanvas");
        
                var topFringe = d3.select("#" + target.id + ".CITopFringes");
                var bottomFringe = d3.select("#" + target.id + ".CIBottomFringes");
    
                var variableList = sort(currentVariableSelection);        
                var topLine = canvas.append("line")
                        .attr("x1", (parseFloat(topFringe.attr("x1")) + parseFloat(topFringe.attr("x2")))/2)
                        .attr("y1", topFringe.attr("y1"))
                        .attr("x2", canvasWidth/2 - plotWidth/2 - axesOffset)
                        .attr("y2", topFringe.attr("y1"))
                        .attr("stroke", "black")
                        .attr("stroke-dasharray", "5,5")
                        .attr("class", "hover");
                
                var bottomLine = canvas.append("line")
                        .attr("x1", (parseFloat(bottomFringe.attr("x1")) + parseFloat(bottomFringe.attr("x2")))/2)
                        .attr("y1", bottomFringe.attr("y1"))
                        .attr("x2", canvasWidth/2 - plotWidth/2 - axesOffset)
                        .attr("y2", bottomFringe.attr("y1"))
                        .attr("stroke", "black")
                        .attr("stroke-dasharray", "5,5")
                        .attr("class", "hover");
                   
                canvas.append("text")
                        .attr("x",parseFloat(topFringe.attr("x1")))
                        .attr("y", parseFloat(topFringe.attr("y1")) - displayOffsetTop)
                        .attr("text-anchor", "middle")
                        .text(dec2(getActualValue(parseFloat(topFringe.attr("y1")))))
                        .attr("class", "hover");
                
                canvas.append("text")
                        .attr("x",parseFloat(bottomFringe.attr("x1")))
                        .attr("y", parseFloat(bottomFringe.attr("y1")) + displayOffsetBottom)
                        .attr("text-anchor", "middle")
                        .text(dec2(getActualValue(parseFloat(bottomFringe.attr("y1")))))
                        .attr("class", "hover");
            }
            
            else if((target.className.baseVal == "CI_mean") || (target.className.baseVal == "CI_top") || (target.className.baseVal == "CI_bottom"))
            {
                var canvas = d3.select("#plotCanvas");
        
                var topFringe = d3.select(".CI_top");
                var bottomFringe = d3.select(".CI_bottom");
    
                var variableList = sort(currentVariableSelection);       
                
                var top = dec2(testResults["CI"][1]);
                var bottom = dec2(testResults["CI"][0]);
                   
                canvas.append("text")
                        .attr("x",parseFloat(topFringe.attr("x1")))
                        .attr("y", parseFloat(topFringe.attr("y1")) - displayOffsetTop)
                        .attr("text-anchor", "middle")
                        .text(top)
                        .attr("class", "hover");
                
                canvas.append("text")
                        .attr("x",parseFloat(bottomFringe.attr("x1")))
                        .attr("y", parseFloat(bottomFringe.attr("y1")) + displayOffsetBottom)
                        .attr("text-anchor", "middle")
                        .text(bottom)
                        .attr("class", "hover");
            }
    
            else if(target.className.baseVal == "regression")
            {
                var regressionElements = d3.selectAll(".regression").attr("cursor", "pointer");
            }
    
            else if(target.className.baseVal == "outcomeVariable")
            {
                setup(e, target);
        
                var outcomeVariableButton = d3.select("#button.outcomeVariable");
                var outcomeVariableText = d3.select("#text.outcomeVariable");
        
                d3.selectAll(".outcomeVariable").attr("cursor", "pointer");
            }
    
            else if(target.className.baseVal == "tukeyMean")
            {
                setup(e, target);
        
                var mean = d3.select("#" + target.id + ".tukeyMean");
                var canvas = d3.select("#plotCanvas");
        
                canvas.append("line")
                        .attr("x1", mean.attr("cx"))
                        .attr("y1", mean.attr("cy"))
                        .attr("x2", canvasWidth/2 - plotWidth/2 - axesOffset)
                        .attr("y2", mean.attr("cy"))
                        .attr("stroke", mean.attr("fill"))
                        .attr("stroke-dasharray", "5,5")
                        .attr("class", "hover");
        
                canvas.append("text")
                        .attr("x", e.pageX - (width - canvasWidth - sideBarWidth) + 9)
                        .attr("y", e.pageY + 9)
                        .attr("fill", "black")
                        .text(tukeyResults[mean.attr("data-index1")][mean.attr("data-index2")]["difference"])
                        .attr("class", "hover");
            }
    
            else if((target.className.baseVal == "tukeyCI") || (target.className.baseVal == "tukeyCITop") || (target.className.baseVal == "tukeyCIBottom"))
            {
                setup(e, target);
        
                var tCI = d3.select("#" + target.id + ".tukeyCI");
                var tCITop = d3.select("#" + target.id + ".tukeyCITop");
                var tCIBottom = d3.select("#" + target.id + ".tukeyCIBottom");
        
                var canvas = d3.select("#plotCanvas");
                
                canvas.append("text")
                        .attr("x", tCITop.attr("x1"))
                        .attr("y", tCITop.attr("y1") - displayOffsetTop)
                        .attr("text-anchor", "middle")
                        .attr("fill", "black")
                        .text(tukeyResults[tCITop.attr("data-index1")][tCITop.attr("data-index2")]["upper"])
                        .attr("class", "hover");
        
                canvas.append("text")
                        .attr("x", tCIBottom.attr("x1"))
                        .attr("y", parseFloat(tCIBottom.attr("y1")) + displayOffsetBottom)
                        .attr("text-anchor", "middle")
                        .attr("fill", "black")
                        .text(tukeyResults[tCIBottom.attr("data-index1")][tCIBottom.attr("data-index2")]["lower"])
                        .attr("class", "hover");
        
                canvas.append("line")
                        .attr("x1", tCITop.attr("x1"))
                        .attr("y1", tCITop.attr("y1"))
                        .attr("x2", canvasWidth/2 - plotWidth/2 - axesOffset)
                        .attr("y2", tCITop.attr("y1"))
                        .attr("stroke", tCITop.attr("stroke"))
                        .attr("stroke-dasharray", "5,5")
                        .attr("class", "hover");
                canvas.append("line")
                        .attr("x1", tCIBottom.attr("x1"))
                        .attr("y1", tCIBottom.attr("y1"))
                        .attr("x2", canvasWidth/2 - plotWidth/2 - axesOffset)
                        .attr("y2", tCIBottom.attr("y1"))
                        .attr("stroke", tCIBottom.attr("stroke"))
                        .attr("stroke-dasharray", "5,5")
                        .attr("class", "hover");
            }
    
            else if(target.className.baseVal == "differenceInMeans")
            {
                var differenceInMeansText = d3.select("#" + target.id + ".differenceInMeansText");
        
                differenceInMeansText.attr("display", "inline");
        
                var differenceInMeansLines = document.getElementsByClassName("differenceInMeans");
        
                for(var i=0; i<differenceInMeansLines.length; i++)
                {
                    if(differenceInMeansLines[i].getAttribute("id") != target.id)
                    {
                        differenceInMeansLines[i].setAttribute("opacity", "0.2");
                    }
                }
            }
    
            else if(target.className.baseVal == "interactionEffect")
            {
                setup(e, target);
        
                d3.selectAll(".interactionEffect").attr("cursor", "pointer");
            }
    
            else if(target.className.baseVal == "pairwisePostHoc")
            {
                setup(e, target);
        
                d3.selectAll(".pairwisePostHoc").attr("cursor", "pointer");
            }
            
            else if(target.className.baseVal == "tukeyHSD")
            {
                setup(e, target);
        
                d3.selectAll(".tukeyHSD").attr("cursor", "pointer");
            }
    
            else if(target.className.baseVal == "doPairwiseTest")
            {
                setup(e, target);
        
                d3.selectAll(".doPairwiseTest").attr("cursor", "pointer");
            }
            
            else if(target.className.baseVal == "effectButtonFront")
            {
                setup(e, target);
                
                var effectButton = d3.select("#" + target.id + ".effectButtonFront");
                
                if(d3.select("#" + target.id + ".effectButtonBack").attr("stroke") == "black")
                    effectButton.attr("cursor", "pointer");
            }
            
            else if((target.className.baseVal == "stateForNavigation") || (target.className.baseVal == "stateForNavigationText"))
            {
                setup(e, target);
                
                var button = d3.select("#" + target.id + ".stateForNavigation");
                var buttonText = d3.select("#" + target.id + ".stateForNavigationText");
                
                if(button.attr("stroke") == "black")
                {
                    button.attr("cursor", "pointer");
                    buttonText.attr("cursor", "pointer");
                }
                else
                {
                    button.attr("cursor", "default");
                    buttonText.attr("cursor", "pointer");
                }
            }
            
            else if(target.id == "effectSizeFront")
            {
                setup(e, target);
                
                d3.selectAll("#effectSizeText, #effectSizeValue").attr("display", "none");
                d3.selectAll(".effectSizeInterpretationIndicators").attr("display", "inline");
            } 
        }
    }
}

function OnMouseOut(e)
{    
    var target = e.target != null ? e.target : e.srcElement;
    
    if(help)
    {
        if(target.className.baseVal == "plotHelp")
        {
            d3.select(".plotHelp").attr("fill", "white").attr("opacity","0.01").attr("cursor", "default");        
        }
        
        if(target.className.baseVal == "variancePlotHelp")
        {
            d3.select(".variancePlotHelp").attr("fill", "white").attr("opacity","0.01").attr("cursor", "default");        
        }
        
        if(target.className.baseVal == "normalityPlotHelp")
        {
            d3.select(".normalityPlotHelp").attr("fill", "white").attr("opacity","0.01").attr("cursor", "default");        
        }
        
        if(target.className.baseVal == "pValueHelp")
        {
            d3.select(".pValueHelp").attr("fill", "white").attr("opacity","0.01").attr("cursor", "default");        
        }
        
        if(target.className.baseVal == "testStatisticHelp")
        {
            d3.select(".testStatisticHelp").attr("fill", "white").attr("opacity","0.01").attr("cursor", "default");        
        }
        
        if(target.className.baseVal == "methodHelp")
        {
            d3.select(".methodHelp").attr("fill", "white").attr("opacity","0.01").attr("cursor", "default");        
        }
        
        if(target.className.baseVal == "effectSizeHelp")
        {
            d3.select(".effectSizeHelp").attr("fill", "white").attr("opacity","0.01").attr("cursor", "default");        
        }
        
        if(target.className.baseVal == "assumptionsButtonFront")
        {
            d3.select("#" + target.id + ".assumptionsButtonBack").attr("stroke-width", "1px");
            d3.select("#" + target.id + ".assumptionsButtonFront").attr("cursor", "pointer");
        }
        
        if(target.className.baseVal == "compareMean")
        {
            d3.select("#button.compareMean").attr("stroke-width", "1px").attr("cursor", "pointer");
            d3.select("#text.compareMean").attr("cursor", "pointer");
        }
        
        if(target.className.baseVal == "compareNow")
        {
            d3.select("#button.compareNow").attr("stroke-width", "1px").attr("cursor", "pointer");
            d3.select("#text.compareNow").attr("cursor", "pointer");
        }
        
        if(target.className.baseVal == "pairwisePostHoc")
        {
            d3.select("#button.pairwisePostHoc").attr("stroke-width", "1px").attr("cursor", "pointer");
            d3.select("#text.pairwisePostHoc").attr("cursor", "pointer");
        }
        
        if(target.className.baseVal == "tukeyHSD")
        {
            d3.select("#button.tukeyHSD").attr("stroke-width", "1px").attr("cursor", "pointer");
            d3.select("#text.tukeyHSD").attr("cursor", "pointer");
        }
        
        if(target.className.baseVal == "regression")
        {
            d3.select("#button.regression").attr("stroke-width", "1px").attr("cursor", "pointer");
            d3.select("#text.regression").attr("cursor", "pointer");
        }
        
        if(target.className.baseVal == "interactionEffect")
        {
            d3.select("#button.interactionEffect").attr("stroke-width", "1px").attr("cursor", "pointer");
            d3.select("#text.interactionEffect").attr("cursor", "pointer");
        }
        
        if(target.className.baseVal == "variableNameHolderFront")
        {
            var varName = target.id;
            
            d3.select("#" + varName + ".variableNameHolderBack").attr("stroke-width","1px");
            d3.select("#" + varName + ".variableNameHolderFront").attr("cursor", "pointer");
        }
        
        if(target.id == "regressionLine")
        {
            d3.selectAll("#regressionLine").attr("stroke-width", "10px").attr("cursor", "default");
        }
        
        if(target.id == "equation")
        {
            d3.selectAll("#equation").attr("fill", "orange").attr("cursor", "default");
        }
        
    }
    else
    {                
        if(target.className.baseVal == "variableNameHolder")                
        {
            var variableNameHolder = d3.selectAll("#" + target.id + ".variableNameHolder");
        }
    
        else if(target.className.baseVal == "visualisationHolder")                
        {
            var visualisationHolder = d3.selectAll("#" + target.id + ".visualisationHolder");
        }
    
        else if(target.className.baseVal == "means")                
        {
            var meanCircle = d3.selectAll("#" + target.id + ".means");
        
            if(meanCircle.attr("r") == engorgedMeanRadius)
            {
                if(meanCircle.attr("fill") != meanColors["click"])
                {
                    meanCircle.attr("fill", meanColors["normal"]);
                    var incompleteLine = d3.select(".incompleteLines").attr("display", "none");
                }
            }
            else
            {
                removeElementsByClassName("hover");
            }
        
            removeElementsByClassName("loops");
            clearInterval(intervals[meanCircle.attr("id")]);
        
    //         var incompleteLines = d3.selectAll(".incompleteLines");
    //             
    //         if(document.getElementsByClassName("incompleteLines").length > 0)
    //         {
    //             incompleteLines.attr("stroke", meanColors["normal"]);
    //         }   
        }
    
        else if(target.className.baseVal == "bins")                
        {
            var bins = d3.selectAll(".bins");
        
            unhighlightBins();
        }
    
        else if(target.className.baseVal == "datapoints")                
        {
            var datapoint = d3.select("#" + target.id + ".datapoints");
        
            datapoint.transition().duration(300).attr("r", datapointRadius);
            removeElementsByClassName("hoverText");
        }
    
        else if(target.className.baseVal == "outliers")
        {
            var canvas = d3.select("#plotCanvas");
            var outlier = d3.select("#" + target.id + ".outliers");
        
            outlier.attr("r", outlierRadius).attr("stroke", "none");
            removeElementsByClassName("hover");
        }
    
        else if((target.className.baseVal == "TOPFringes") || (target.className.baseVal == "BOTTOMFringes"))
        {
            var canvas = d3.select("#plotCanvas");
        
            var tFringe = d3.select("#" + target.id + ".TOPFringes");
            var bFringe = d3.select("#" + target.id + ".BOTTOMFringes");
        
            tFringe.attr("stroke-width", 2);
            bFringe.attr("stroke-width", 2);
        
            removeElementsByClassName("hover");
        }
    
        else if((target.className.baseVal == "CIs") || (target.className.baseVal == "CITopFringes") || (target.className.baseVal == "CIBottomFringes"))
        {
            removeElementsByClassName("hover");
        }
        
        else if((target.className.baseVal == "CI_mean") || (target.className.baseVal == "CI_top") || (target.className.baseVal == "CI_bottom"))
        {
            removeElementsByClassName("hover");
        }
    
        else if((target.id == "regressionLine"))
        {
    //         removeElementsByClassName("regressionPrediction");
    //         removeElementsByClassName("lineToAxis")
        }
    
        else if((target.className.baseVal == "tukeyMean") || (target.className.baseVal == "tukeyCI") || (target.className.baseVal == "tukeyCITop") || (target.className.baseVal == "tukeyCIBottom"))
        {
            removeElementsByClassName("hover");
        }
    
        else if(target.className.baseVal == "differenceInMeans")
        {
            var differenceInMeansText = d3.select("#" + target.id + ".differenceInMeansText");
        
            differenceInMeansText.attr("display", "none");
        
            var differenceInMeansLines = document.getElementsByClassName("differenceInMeans");
        
            for(var i=0; i<differenceInMeansLines.length; i++)
            {
                if(differenceInMeansLines[i].getAttribute("id") != target.id)
                {
                    differenceInMeansLines[i].setAttribute("opacity", "1.0");
                }
            }
        }
        
        else if(target.id == "effectSizeFront")
        {
            d3.selectAll("#effectSizeText, #effectSizeValue").attr("display", "inline");
            d3.selectAll(".effectSizeInterpretationIndicators").attr("display", "none");
        }
    }
}	

function setup(e, target)
{
    // grab the mouse position
    _startX = e.clientX;
    _startY = e.clientY;

    // grab the clicked element's position
    _offsetX = removeAlphabetsFromString(target.style.left);
    _offsetY = removeAlphabetsFromString(target.style.top);      

    // bring the clicked element to the front while it is being dragged
    _oldZIndex = target.style.zIndex;
    target.style.zIndex = +1;

    // we need to access the element in OnMouseMove
    _dragElement = target;

    // tell our code to start moving the element with the mouse
    document.onmousemove = OnMouseMove;

    // cancel out any text selections
    document.body.focus();

    // prevent text selection in IE
    document.onselectstart = function () { return false; };
    // prevent IE from trying to drag an image
    target.ondragstart = function() { return false; };		
}