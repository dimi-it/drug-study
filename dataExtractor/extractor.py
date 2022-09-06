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

nameList = ["salbutamolo","indacaterolo","propranololo","eroina"]
outList = []

driver = webdriver.Firefox(executable_path="./geckodriver")

for name in nameList:
    driver.get(mainUrl + searchUrl + name)
    sleep(t)
    if(driver.find_elements(By.CLASS_NAME, "drug-content")):
        title = driver.find_element(By.XPATH, "/html/body/main/div/div/div[2]/div[1]/h1").text
        imageUrl = driver.find_element(By.XPATH, "/html/body/main/div/div/div[2]/div[2]/dl[1]/dd[8]/div[1]/a/img").click()
        sleep(t)
        fileName = name + ".png"
        fileName = "./images/" + fileName
        driver.save_screenshot(fileName)
        sleep(t)
        print(name, title)
        outList.append({"name":name, "secondName":title, "found":True})
    else:
        outList.append({"name":name, "secondName":"", "found":False})
        print(name, "not found")

driver.close()

f = open(mainFile, "w")
f.write(json.dumps({"results":outList}))
f.close()