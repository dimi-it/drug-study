from pickle import TRUE
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from time import sleep
import json

t = 2
mainUrl = "https://go.drugbank.com"
searchUrl = "/unearth/q?searcher=drugs&query="
mainFile = "results.json"

nameList = [("SALBUTAMOLO",	"RECETTORI BETA ENERGICI"),
("INDACATEROLO",	"RECETTORI BETA ENERGICI"),
("PROPRANOLOLO",	"RECETTORI BETA ENERGICI"),
("ATENOLOLO",	"RECETTORI BETA ENERGICI"),
("MISOPROSTOLO",	"INFIAMMATORI"),
("PARACETAMOLO",	"INFIAMMATORI"),
("ACIDO SALICILICO",	"INFIAMMATORI"),
("ASPIRINA",	"INFIAMMATORI"),
("CORTISOLO",	"INFIAMMATORI"),
("BETAMETASONE",	"INFIAMMATORI"),
("ISTAMINA",	"ANTISTAMINICI"),
("DIFENILDRAMINA",	"ANTISTAMINICI"),
("DOXEPINA",	"ANTISTAMINICI"),
("CETIRIZINA",	"ANTISTAMINICI"),
("FUROSEMIDE",	"DIURETICI"),
("BENZOTIADIAZINE",	"DIURETICI"),
("IDROCLOROTIAZIDE",	"DIURETICI"),
("ESTRADIOLO",	"STEROIDI ANABOLIZZANTI - ORMONI"),
("PROGESTERONE",	"STEROIDI ANABOLIZZANTI - ORMONI"),
("TESTOSTERONE",	"STEROIDI ANABOLIZZANTI - ORMONI"),
("EPITESTOSTERONE",	"STEROIDI ANABOLIZZANTI - ORMONI"),
("NANDROLONE",	"STEROIDI ANABOLIZZANTI - ORMONI"),
("SOSTANOZOLOLO",	"STEROIDI ANABOLIZZANTI - ORMONI"),
("BENZODIAZEPINE",	"ANSIOLITICI"),
("SEROTONINA",	"PSICOTOMIMETICI"),
("PSILOCINA",	"PSICOTOMIMETICI"),
("LSD",	"PSICOTOMIMETICI"),
("DOM",	"PSICOTOMIMETICI"),
("GLUTAMMATO",	"PSICOTOMIMETICI"),
("KETAMINA",	"PSICOTOMIMETICI"),
("DOPAMINA",	"STIMOLANTI"),
("ADRENALINA",	"STIMOLANTI"),
("NORADRENALINA",	"STIMOLANTI"),
("AMFETAMINA",	"STIMOLANTI"),
("EFEDRINA",	"STIMOLANTI"),
("COCAINA",	"STIMOLANTI"),
("ADENOSINA",	"STIMOLANTI"),
("CAFFEINA",	"STIMOLANTI"),
("MORFINA",	"NARCOTICI ANALGESICI"),
("CODEINA",	"NARCOTICI ANALGESICI"),
("EROINA",	"NARCOTICI ANALGESICI"),
("METADONE", "NARCOTICI ANALGESICI"),
("ISOPROTENEROLO", ""),
("FENOXIBENZAMMINA", ""),
("DOXORUBRICINA", "")]
outList = []

driver = webdriver.Firefox(executable_path="./geckodriver")

for item in nameList:
    driver.get(mainUrl + searchUrl + item[0])
    sleep(t)
    if(driver.find_elements(By.CLASS_NAME, "drug-content")):
        title = driver.find_element(By.XPATH, "/html/body/main/div/div/div[2]/div[1]/h1").text
        try:
            imageElement = driver.find_element(By.CLASS_NAME, "moldbi-vector-thumbnail").click()
        except:
            outList.append({"name":item[0], "secondName":"", "category":item[1], "found":False})
            print(item[0], "not found")
            continue
        sleep(t)
        fileName = item[0] + ".png"
        fileName = "./images/" + fileName
        driver.save_screenshot(fileName)
        sleep(t)
        print(item[0], title)
        outList.append({"name":item[0], "secondName":title, "category":item[1], "found":True})
    else:
        outList.append({"name":item[0], "secondName":"", "category":item[1], "found":False})
        print(item[0], "not found")

driver.close()

f = open(mainFile, "w")
f.write(json.dumps({"results":outList}))
f.close()