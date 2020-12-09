from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.support.select import Select
import time
driver = webdriver.Firefox()
baseSitePath="localhost:8000"
driver.get(baseSitePath)

firstName="Selenium"
lastName="Test"
email="seleniumtest@gmail.com"
if driver.name=='firefox':
    dob = '1978-04-04'
else:
    dob= '04/04/1978'
password="pass123"

def registerTest():
    driver.get(baseSitePath)
    driver.find_element_by_id("firstName-text").send_keys(firstName)
    driver.find_element_by_id("lastName-text").send_keys(lastName)
    driver.find_element_by_id("email-text").send_keys(email)
    driver.find_element_by_id("dob-text").send_keys(dob)
    driver.find_element_by_id("password-text").send_keys(password)
    driver.find_element(By.XPATH, '//*[@id="regform"]/button').click()
    time.sleep(2)

def loginTest():
    driver.find_element(By.XPATH, '/html/body/main/div[3]/button').click()
    driver.find_element_by_id("email-login-text").send_keys(email)
    driver.find_element_by_id("password-login-text").send_keys(password)
    driver.find_element(By.XPATH, '//*[@id="loginform"]/button').click()
    element = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.XPATH, '//*[@id="results"]/a')))
    time.sleep(1)
    driver.find_element(By.XPATH, '//*[@id="results"]/a').click()
    time.sleep(1)
    if driver.find_elements_by_id('subscribePolitics'):
        driver.find_element_by_id("subscribePolitics").click()
        driver.find_element_by_id("subscribeFinance").click()
        driver.find_element_by_id("SubmitButton").location_once_scrolled_into_view
        time.sleep(2)
        driver.find_element_by_id("SubmitButton").click()
    time.sleep(2)

def LikeAnArticle():   
    if not driver.find_elements_by_css_selector("[id^='LikeBtn']")[0].is_displayed(): 
        driver.find_elements_by_css_selector("[id^='UnlikeBtn']")[0].click()
    time.sleep(1)
    driver.find_elements_by_css_selector("[id^='LikeBtn']")[0].location_once_scrolled_into_view
    driver.find_elements_by_css_selector("[id^='LikeBtn']")[0].click()
    time.sleep(1)

def postCommentThenDelete():
    driver.find_element(By.XPATH,'//*[@id="groupItem"]/div[1]/div[2]/button').click()
    driver.execute_script('''document.querySelector("[id^='commsList']").scrollTop=100000''')
    time.sleep(1)
    driver.find_elements_by_css_selector("[id^='baseInput']")[0].send_keys("This comment was written by selenium")
    time.sleep(1)
    driver.find_elements_by_css_selector("[id^='sendMessageButton']")[0].click()
    time.sleep(1)
    driver.execute_script('''document.querySelector("[id^='commsList']").scrollTop=100000''')
    driver.find_element(By.XPATH,'//*[@id="groupItem"]/div[1]/div[2]/div/div[2]/ul/li[last()]/table/tbody/tr/td[3]/div').click()
    driver.execute_script('''document.querySelector("[id^='commsList']").scrollTop=100000''')
    time.sleep(2)
    driver.find_element(By.XPATH,'//*[@id="groupItem"]/div[1]/div[2]/div/div[2]/ul/li[last()]/table/tbody/tr/td[3]/div/div/div/button[3]').click()
    
def FullRunThrough():
    registerTest()
    loginTest()
    LikeAnArticle()
    postCommentThenDelete()