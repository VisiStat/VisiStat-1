performOneWayRepeatedMeasuresANOVA <- function(dependentVariable, independentVariable, participantVariable, dataset)
{   
    table <- as.data.frame(dataset);
    
    levels = eval(parse(text = paste("unique(table$", independentVariable, ")", sep="")))   
    
    for(i in 1:length(levels))
    {
        if(i == 1)
        {
            distributions = c(list(eval(parse(text = paste("(subset(table, ", independentVariable, " == \"", levels[i], "\"))$", dependentVariable, sep = "")))))
        }
        else
        {
            distributions = c(distributions, list(eval(parse(text = paste("(subset(table, ", independentVariable, " == \"", levels[i], "\"))$", dependentVariable, sep = "")))))
        }
    }
    
    result = findError(distributions);
    error = result$error;
    
    result <- eval(parse(text = paste("ez::ezANOVA(table,",dependentVariable,",",participantVariable,",between=",independentVariable,")",sep="")));
    result <- result$ANOVA;
    
    list(numDF = result$DFn, denomDF = result$DFd, F = result$F, p = result$p, etaSquared = result$ges, error = error);    
}