//dataset information

//Preprocessing
var datasetInformation = new Object();
    datasetInformation["impact"] = "Dataset comparing the verbal, spatial, and other such abilities of athletes in two groups - control and concussed";
    datasetInformation["cars"] = "Dataset with details about different cars";
    datasetInformation["weightLoss"] = "Dataset comparing the weight lost by participants in 3 groups: those who skipped breakfast, those who skipped lunch, and those who skipped dinner";
    datasetInformation["store"] = "TBD";
    datasetInformation["SAT"] = "When deciding whether to admit an applicant, colleges take lots of factors, such as grades, sports, activities, leadership positions, awards, teacher recommendations, and test scores, into consideration. Using SAT scores as a basis of whether to admit a student or not has created some controversy. Among other things, people question whether the SATs are fair and whether they predict college performance. This study examines the SAT and GPA information of 105 students who graduated from a state university with a B.S. in computer science. Using the grades and test scores from high school, can you predict a student's college grades?";
    datasetInformation["hotdogs"] = "Results of a laboratory analysis of calories and sodium content of major hot dog brands. Researchers for Consumer Reports analyzed three types of hot dog: beef, poultry, and meat (mostly pork and beef, but up to 15% poultry meat).";
    datasetInformation["bankloan"] = "TBD";
    datasetInformation["car_sales"] = "TBD";
    datasetInformation["hp"] = "TBD";
    datasetInformation["keyboards"] = "In this experiment, three types of keyboard layouts are compared (QWERTY, DVORAK, and i10). The experiment follows a between-groups design. For each participant, the typing speed (in words per minute) and the errors (in number of errors per minute) are measured. Following the experiment, we also get the satisfaction rating from the participant. The gender of the participant is also considered as an independent variable.";
    datasetInformation["foodEffect"] = "We compare the effect of different types of food on the participant' test scores. The foods considered are plain yoghurt, a snickers bar, and a sandwich. We measure the verbal (language) and the quantitative (math) scores of the participant. Since the same set of participants are used for different conditions (foodEaten), this experiment follows a within-groups design. Following the experiment, we also get the satisfaction rating from the participant. The gender of the participant is also considered as an independent variable.";
    datasetInformation["weight_loss"] = "Does skipping a meal lead to weight loss? If so, does it vary for different meals? In this experiment, we compare the weight lost by participants under four different conditions: skip breakfast, skip lunch, skip dinner, and control. We measured the amount of weight lost (positive value means that weight was lost) and the absolute BMI after 3 months. The experiment follows a between-group design. Following the experiment, we also get the satisfaction rating from the participant. The amount of exercise of the participant is also considered as an independent variable.";
    datasetInformation["phoneEffect"] = "In this experiment, we compare three different types of phone operating systems for their emotional impact on the users. In particular, we measure the stress and happiness levels of the user after using the phone OS for 6 months. The scores are out of 100 and are based on heuristics. Since we used the same set of participants for different conditions (phone OS), this experiment follows a within-groups design. Following the experiment, we also get the satisfaction rating from the participant. The gender of the participant is also considered as an independent variable.";

var variablesInDataset = new Object();
    variablesInDataset["impact"] = ["subject","condition","verbalMemoryPre","visualMemoryPre","visualMotorSpeedPre","reactionTimePre","impulseControlPre","totalSymptomPre","verbalMemoryPost","visualMemoryPost","visualMotorSpeedPost","reactionTimePost","impulseConstrolPost","totalSymptomPost"]
    variablesInDataset["cars"] = ["Car","MPG","Cylinders","Displacement","Horsepower","Weight","Acceleration","Model","Origin"];
    variablesInDataset["weightLoss"] = ["participantID", "ageGroup", "condition", "weightLost"];
    variablesInDataset["store"] = ["ID", "price", "store", "subject"];
    variablesInDataset["SAT"] = ["participantID", "high_GPA", "math_SAT", "verb_SAT", "comp_GPA", "univ_GPA"];
    variablesInDataset["hotdogs"] = ["Type", "Calories", "Sodium"];
    variablesInDataset["bankloan"] = ["age", "ed", "employ", "address", "debtinc", "creddebt", "otherdebt", "preddef1", "preddef2", "preddef3"];
    variablesInDataset["car_sales"] = ["manufact", "model", "sales", "resale", "type", "price", "engine_s", "horsepow", "wheelbas", "width", "length", "curb_wgt", "fuel_cap", "mpg"];
    variablesInDataset["hp"] = ["name", "house", "pet"];
    variablesInDataset["keyboards"] = ["participantID", "keyboardLayout", "gender", "typingSpeed", "errors", "userSatisfaction"];
    variablesInDataset["foodEffect"] = ["participantID","foodEaten","gender","score_V","score_Q","satisfactionRating"];
    variablesInDataset["weight_loss"] = ["participantID","condition","exercise","weightLost","BMI","userRating"];
    variablesInDataset["phoneEffect"] = ["participantID","phoneOS","gender", "stressScore","happScore","satisfaction"];
 
var types = ["participant", "dependent", "independent"];
var variablesInDatasetRow = new Object();

var dataTypes = ["nominal", "ordinal", "interval", "ratio"];
var variablesInDatasetType = new Object();
    variablesInDatasetType["impact"] = [dataTypes[0], dataTypes[0], dataTypes[3], dataTypes[3], dataTypes[3], dataTypes[3], dataTypes[3], dataTypes[3], dataTypes[3], dataTypes[3], dataTypes[3], dataTypes[3], dataTypes[3], dataTypes[3]];
    variablesInDatasetType["cars"] = [dataTypes[0], dataTypes[3], dataTypes[1], dataTypes[3], dataTypes[3], dataTypes[3], dataTypes[3], dataTypes[0], dataTypes[0]];
    variablesInDatasetType["weightLoss"] = [dataTypes[0], dataTypes[0], dataTypes[0], dataTypes[3]];
    variablesInDatasetType["store"] = [dataTypes[0], dataTypes[3], dataTypes[0], dataTypes[0]];
    variablesInDatasetType["SAT"] = [dataTypes[0], dataTypes[2], dataTypes[2], dataTypes[2], dataTypes[2], dataTypes[2]];
    variablesInDatasetType["hotdogs"] = [dataTypes[0], dataTypes[3], dataTypes[3]];
    variablesInDatasetType["bankloan"] = [dataTypes[3], dataTypes[0], dataTypes[0], dataTypes[2], dataTypes[3], dataTypes[3], dataTypes[3], dataTypes[3], dataTypes[3], dataTypes[3]];
    variablesInDatasetType["car_sales"] = [dataTypes[0], dataTypes[0], dataTypes[3], dataTypes[3], dataTypes[0], dataTypes[3], dataTypes[3], dataTypes[3], dataTypes[3], dataTypes[3], dataTypes[3], dataTypes[3], dataTypes[3]];
    variablesInDatasetType["hp"] = [dataTypes[0], dataTypes[0], dataTypes[0]];
    variablesInDatasetType["keyboards"] = [dataTypes[0], dataTypes[0], dataTypes[0], dataTypes[3], dataTypes[3], dataTypes[1]];
    variablesInDatasetType["foodEffect"] = [dataTypes[0], dataTypes[0], dataTypes[0], dataTypes[3], dataTypes[3], dataTypes[1]];
    variablesInDatasetType["weight_loss"] = [dataTypes[0], dataTypes[0], dataTypes[1], dataTypes[3], dataTypes[2], dataTypes[1]];
    variablesInDatasetType["phoneEffect"] = [dataTypes[0], dataTypes[0], dataTypes[0], dataTypes[3], dataTypes[3], dataTypes[1]];
    
function initVariablesInDatasetTypes()
{  
    variablesInDatasetRow["impact"] = [types[0], types[2], types[1], types[1], types[1], types[1], types[1], types[1], types[1], types[1], types[1], types[1], types[1], types[1]];
    variablesInDatasetRow["cars"] = [types[0], types[1], types[2], types[1], types[1], types[1], types[1], types[1], types[2]];
    variablesInDatasetRow["weightLoss"] = [types[0], types[2], types[2], types[1]];
    variablesInDatasetRow["store"] = [types[1], types[1], types[2], types[0]];    
    variablesInDatasetRow["SAT"] = [types[0], types[1], types[1], types[1], types[1], types[1]];
    variablesInDatasetRow["hotdogs"] = [types[2], types[1], types[1]];
    variablesInDatasetRow["bankloan"] = [types[1], types[2], types[2], types[1], types[1], types[1], types[1], types[1], types[1], types[1]];
    variablesInDatasetRow["car_sales"] = [types[2], types[0], types[1], types[1], types[2], types[1], types[1], types[1], types[1], types[1], types[1], types[1], types[1]];
    variablesInDatasetRow["hp"] = [types[2], types[2], types[2]];
    variablesInDatasetRow["keyboards"] = [types[0], types[2], types[2], types[1], types[1], types[1]];
    variablesInDatasetRow["foodEffect"] = [types[0], types[2], types[2], types[1], types[1], types[1]];
    variablesInDatasetRow["weight_loss"] = [types[0], types[2], types[2], types[1], types[1], types[1]];
    variablesInDatasetRow["phoneEffect"] = [types[0], types[2], types[2], types[1], types[1], types[1]];
}