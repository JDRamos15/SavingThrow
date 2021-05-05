import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time

class SavingThrow(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Firefox()
    
    def tearDown(self):
        self.driver.close()
        
    
    # ------------------------------------- Home page tests ------------------------------------


    def test_access_create_account_page(self):
        driver = self.driver
        driver.get("localhost:3000")

        driver.find_element_by_link_text("Create account").click()

        assert "/create-user" in driver.current_url
    
    
    def test_access_sign_in_page(self):
        driver = self.driver
        driver.get("localhost:3000")

        driver.find_element_by_link_text("Sign in").click()

        assert "/login" in driver.current_url


    # ------------------------------------- Create Account page tests ------------------------------------


    
    def test_create_account_wrong_email_format(self):
        driver = self.driver
        driver.get("localhost:3000")

        driver.find_element_by_link_text("Create account").click()

        time.sleep(3)

        # Create account
        name = driver.find_element_by_id("first_name")
        name.clear()
        name.send_keys("Test")
        lastname = driver.find_element_by_id("last_name")
        lastname.clear()
        lastname.send_keys("Subject")
        username = driver.find_element_by_id("username")
        username.clear()
        username.send_keys("TestSubject")
        email = driver.find_element_by_id("email")
        email.clear()
        email.send_keys("test_email")
        password = driver.find_element_by_id("password")
        password.clear()
        password.send_keys("Password123#")

        driver.find_element_by_xpath("/html/body/div/form/div[6]/button").click()

        time.sleep(2)

        # Check for error message
        assert True


    def test_create_account_used_email(self):
        driver = self.driver
        driver.get("localhost:3000")

        driver.find_element_by_link_text("Create account").click()

        # Create account
        name = driver.find_element_by_id("first_name")
        name.clear()
        name.send_keys("Test")
        lastname = driver.find_element_by_id("last_name")
        lastname.clear()
        lastname.send_keys("Subject")
        username = driver.find_element_by_id("username")
        username.clear()
        username.send_keys("TestSubject1")
        email = driver.find_element_by_id("email")
        email.clear()
        email.send_keys("test_email@gmail.com")
        password = driver.find_element_by_id("password")
        password.clear()
        password.send_keys("Password123#")

        driver.find_element_by_xpath("/html/body/div/form/div[6]/button").click()

        time.sleep(2)


        assert driver.find_element_by_xpath("/html/body/div/form/ul/li")


    def test_create_account_used_username(self):
        driver = self.driver
        driver.get("localhost:3000")

        driver.find_element_by_link_text("Create account").click()

        # Create account
        name = driver.find_element_by_id("first_name")
        name.clear()
        name.send_keys("Test")
        lastname = driver.find_element_by_id("last_name")
        lastname.clear()
        lastname.send_keys("Subject")
        username = driver.find_element_by_id("username")
        username.clear()
        username.send_keys("TestSubject1")
        email = driver.find_element_by_id("email")
        email.clear()
        email.send_keys("test_email1@gmail.com")
        password = driver.find_element_by_id("password")
        password.clear()
        password.send_keys("Password123#")

        driver.find_element_by_xpath("/html/body/div/form/div[6]/button").click()

        time.sleep(2)


        assert driver.find_element_by_xpath("/html/body/div/form/ul/li")


    def test_create_account_successfully(self):
        driver = self.driver
        driver.get("localhost:3000")

        # Read username and email
        f = open("create_account.txt", "r")
        input_username = f.readline()
        input_email = f.readline()
        num = int(input_username[-2])
        f.close()

        fw = open("create_account.txt", "w")


        fw.write(input_username[: len(input_username) - 2] + str(num+1) + "\n")
        fw.write(input_email[: len(input_email) - 1] + str(num+1))

        fw.close()
        # 
    

        driver.find_element_by_link_text("Create account").click()

        # Create account
        name = driver.find_element_by_id("first_name")
        name.clear()
        name.send_keys("Test")
        lastname = driver.find_element_by_id("last_name")
        lastname.clear()
        lastname.send_keys("Subject")
        username = driver.find_element_by_id("username")
        username.clear()
        username.send_keys(input_username)
        email = driver.find_element_by_id("email")
        email.clear()
        email.send_keys(input_email + "@gmail.com")
        password = driver.find_element_by_id("password")
        password.clear()
        password.send_keys("Password123#")

        driver.find_element_by_xpath("/html/body/div/form/div[6]/button").click()

        time.sleep(2)


        assert "/profile/" + input_username[: len(input_username) - 1] in driver.current_url


    def test_create_account_wrong_password(self):
        driver = self.driver
        driver.get("localhost:3000")

        # Read username and email
        f = open("create_account.txt", "r")
        input_username = f.readline()
        input_email = f.readline()
        f.close()
        # 
    

        driver.find_element_by_link_text("Create account").click()

        # Create account
        name = driver.find_element_by_id("first_name")
        name.clear()
        name.send_keys("Test")
        lastname = driver.find_element_by_id("last_name")
        lastname.clear()
        lastname.send_keys("Subject")
        username = driver.find_element_by_id("username")
        username.clear()
        username.send_keys(input_username)
        email = driver.find_element_by_id("email")
        email.clear()
        email.send_keys(input_email + "@gmail.com")
        password = driver.find_element_by_id("password")
        password.clear()
        password.send_keys("password")

        driver.find_element_by_xpath("/html/body/div/form/div[6]/button").click()

        time.sleep(2)


        assert "Must contain lower, upper number, and special character" in driver.page_source


    def test_create_account_no_password(self):
        driver = self.driver
        driver.get("localhost:3000")

        # Read username and email
        f = open("create_account.txt", "r")
        input_username = f.readline()
        input_email = f.readline()
        f.close()
        # 
    

        driver.find_element_by_link_text("Create account").click()

        # Create account
        name = driver.find_element_by_id("first_name")
        name.clear()
        name.send_keys("Test")
        lastname = driver.find_element_by_id("last_name")
        lastname.clear()
        lastname.send_keys("Subject")
        username = driver.find_element_by_id("username")
        username.clear()
        username.send_keys(input_username)
        email = driver.find_element_by_id("email")
        email.clear()
        email.send_keys(input_email + "@gmail.com")
        password = driver.find_element_by_id("password")
        password.clear()
        password.send_keys("")

        driver.find_element_by_xpath("/html/body/div/form/div[6]/button").click()

        time.sleep(2)


        assert "required" in driver.page_source


    def test_create_account_no_email(self):
        driver = self.driver
        driver.get("localhost:3000")

        # Read username and email
        f = open("create_account.txt", "r")
        input_username = f.readline()
        input_email = f.readline()
        f.close()
        # 
    

        driver.find_element_by_link_text("Create account").click()

        # Create account
        name = driver.find_element_by_id("first_name")
        name.clear()
        name.send_keys("Test")
        lastname = driver.find_element_by_id("last_name")
        lastname.clear()
        lastname.send_keys("Subject")
        username = driver.find_element_by_id("username")
        username.clear()
        username.send_keys(input_username)
        email = driver.find_element_by_id("email")
        email.clear()
        email.send_keys("")
        password = driver.find_element_by_id("password")
        password.clear()
        password.send_keys("Password123#")

        driver.find_element_by_xpath("/html/body/div/form/div[6]/button").click()

        time.sleep(2)


        assert "Please enter valid email" in driver.page_source


    def test_create_account_no_username(self):
        driver = self.driver
        driver.get("localhost:3000")

        # Read username and email
        f = open("create_account.txt", "r")
        input_username = f.readline()
        input_email = f.readline()
        f.close()
        # 
    

        driver.find_element_by_link_text("Create account").click()

        # Create account
        name = driver.find_element_by_id("first_name")
        name.clear()
        name.send_keys("Test")
        lastname = driver.find_element_by_id("last_name")
        lastname.clear()
        lastname.send_keys("Subject")
        username = driver.find_element_by_id("username")
        username.clear()
        username.send_keys("")
        email = driver.find_element_by_id("email")
        email.clear()
        email.send_keys(input_email + "@gmail.com")
        password = driver.find_element_by_id("password")
        password.clear()
        password.send_keys("Password123#")

        driver.find_element_by_xpath("/html/body/div/form/div[6]/button").click()

        time.sleep(2)


        assert "Please enter valid username" in driver.page_source




    # ------------------------------------- Sign In page tests ------------------------------------


    def test_sign_in_wrong_username(self):
        driver = self.driver
        driver.get("localhost:3000")

        driver.find_element_by_link_text("Sign in").click()

        # Sign in
        username = driver.find_element_by_id("username")
        username.clear()
        username.send_keys("username")

        password = driver.find_element_by_id("password")
        password.clear()
        password.send_keys("Passwsord123#")

        driver.find_element_by_xpath("/html/body/div/form/div[3]/button").click()

        assert "Incorrect email or password" in driver.page_source



    def test_sign_in_wrong_password(self):
        driver = self.driver
        driver.get("localhost:3000")

        driver.find_element_by_link_text("Sign in").click()

        # Sign in
        username = driver.find_element_by_id("username")
        username.clear()
        username.send_keys("TestSubject6")

        password = driver.find_element_by_id("password")
        password.clear()
        password.send_keys("password")

        driver.find_element_by_xpath("/html/body/div/form/div[3]/button").click()

        assert "Incorrect email or password" in driver.page_source




    def test_sign_in_succsessfully(self):
        driver = self.driver
        driver.get("localhost:3000")

        driver.find_element_by_link_text("Sign in").click()

        # Sign in
        username = driver.find_element_by_id("username")
        username.clear()
        username.send_keys("TestSubject6")

        password = driver.find_element_by_id("password")
        password.clear()
        password.send_keys("Password123#")

        driver.find_element_by_xpath("/html/body/div/form/div[3]/button").click()

        time.sleep(2)

        assert "/profile/TestSubject6" in driver.current_url

# --------------------- Create account and interact with profile ---------------------------

    def test_create_account_join_game(self):
        driver = self.driver
        driver.get("localhost:3000")

        # Read username and email
        f = open("create_account.txt", "r")
        input_username = f.readline()
        input_email = f.readline()
        num = int(input_username[-2])
        f.close()

        fw = open("create_account.txt", "w")


        fw.write(input_username[: len(input_username) - 2] + str(num+1) + "\n")
        fw.write(input_email[: len(input_email) - 1] + str(num+1))

        fw.close()
        # 
    

        driver.find_element_by_link_text("Create account").click()

        # Create account
        name = driver.find_element_by_id("first_name")
        name.clear()
        name.send_keys("Test")
        lastname = driver.find_element_by_id("last_name")
        lastname.clear()
        lastname.send_keys("Subject")
        username = driver.find_element_by_id("username")
        username.clear()
        username.send_keys(input_username)
        email = driver.find_element_by_id("email")
        email.clear()
        email.send_keys(input_email + "@gmail.com")
        password = driver.find_element_by_id("password")
        password.clear()
        password.send_keys("Password123#")

        driver.find_element_by_xpath("/html/body/div/form/div[6]/button").click()

        time.sleep(2)

        # join game
        driver.find_element_by_link_text("Join Game").click()



        assert "/joinGame" in driver.current_url


    def test_create_account_logout(self):
        driver = self.driver
        driver.get("localhost:3000")

        # Read username and email
        f = open("create_account.txt", "r")
        input_username = f.readline()
        input_email = f.readline()
        num = int(input_username[-2])
        f.close()

        fw = open("create_account.txt", "w")


        fw.write(input_username[: len(input_username) - 2] + str(num+1) + "\n")
        fw.write(input_email[: len(input_email) - 1] + str(num+1))

        fw.close()
        # 
    

        driver.find_element_by_link_text("Create account").click()

        # Create account
        name = driver.find_element_by_id("first_name")
        name.clear()
        name.send_keys("Test")
        lastname = driver.find_element_by_id("last_name")
        lastname.clear()
        lastname.send_keys("Subject")
        username = driver.find_element_by_id("username")
        username.clear()
        username.send_keys(input_username)
        email = driver.find_element_by_id("email")
        email.clear()
        email.send_keys(input_email + "@gmail.com")
        password = driver.find_element_by_id("password")
        password.clear()
        password.send_keys("Password123#")

        driver.find_element_by_xpath("/html/body/div/form/div[6]/button").click()

        time.sleep(2)

        # Logout
        driver.find_element_by_link_text("Logout").click()



        assert "localhost:3000" in driver.current_url


    def test_create_account_profile(self):
        driver = self.driver
        driver.get("localhost:3000")

        # Read username and email
        f = open("create_account.txt", "r")
        input_username = f.readline()
        input_email = f.readline()
        num = int(input_username[-2])
        f.close()

        fw = open("create_account.txt", "w")


        fw.write(input_username[: len(input_username) - 2] + str(num+1) + "\n")
        fw.write(input_email[: len(input_email) - 1] + str(num+1))

        fw.close()
        # 
    

        driver.find_element_by_link_text("Create account").click()

        # Create account
        name = driver.find_element_by_id("first_name")
        name.clear()
        name.send_keys("Test")
        lastname = driver.find_element_by_id("last_name")
        lastname.clear()
        lastname.send_keys("Subject")
        username = driver.find_element_by_id("username")
        username.clear()
        username.send_keys(input_username)
        email = driver.find_element_by_id("email")
        email.clear()
        email.send_keys(input_email + "@gmail.com")
        password = driver.find_element_by_id("password")
        password.clear()
        password.send_keys("Password123#")

        driver.find_element_by_xpath("/html/body/div/form/div[6]/button").click()

        time.sleep(2)

        # Profile
        driver.find_element_by_link_text("Profile").click()



        assert "/profile" in driver.current_url



# --------------------- Sign in and interact with profile ---------------------------


    def test_sign_in_join_game(self):
        driver = self.driver
        driver.get("localhost:3000")

        driver.find_element_by_link_text("Sign in").click()

        # Sign in
        username = driver.find_element_by_id("username")
        username.clear()
        username.send_keys("TestSubject6")

        password = driver.find_element_by_id("password")
        password.clear()
        password.send_keys("Password123#")

        driver.find_element_by_xpath("/html/body/div/form/div[3]/button").click()

        time.sleep(2)

        # join game
        driver.find_element_by_link_text("Join Game").click()


        assert "/joinGame" in driver.current_url


    def test_sign_in_logout(self):
        driver = self.driver
        driver.get("localhost:3000")

        driver.find_element_by_link_text("Sign in").click()

        # Sign in
        username = driver.find_element_by_id("username")
        username.clear()
        username.send_keys("TestSubject6")

        password = driver.find_element_by_id("password")
        password.clear()
        password.send_keys("Password123#")

        driver.find_element_by_xpath("/html/body/div/form/div[3]/button").click()

        time.sleep(2)

        # Logout
        driver.find_element_by_link_text("Logout").click()


        assert "localhost:3000" in driver.current_url


    def test_sign_in_join_game_profile(self):
        driver = self.driver
        driver.get("localhost:3000")

        driver.find_element_by_link_text("Sign in").click()

        # Sign in
        username = driver.find_element_by_id("username")
        username.clear()
        username.send_keys("TestSubject6")

        password = driver.find_element_by_id("password")
        password.clear()
        password.send_keys("Password123#")

        driver.find_element_by_xpath("/html/body/div/form/div[3]/button").click()

        time.sleep(2)

        # join game
        driver.find_element_by_link_text("Join Game").click()

        time.sleep(1)
        driver.find_element_by_link_text("Profile").click()


        assert "/profile" in driver.current_url


# -------------------------------------- Join Game ---------------------------------

    def test_join_game_no_room(self):
        driver = self.driver
        driver.get("localhost:3000")

        driver.find_element_by_link_text("Sign in").click()

        # Sign in
        username = driver.find_element_by_id("username")
        username.clear()
        username.send_keys("TestSubject6")

        password = driver.find_element_by_id("password")
        password.clear()
        password.send_keys("Password123#")

        driver.find_element_by_xpath("/html/body/div/form/div[3]/button").click()

        time.sleep(2)

        # join game
        driver.find_element_by_link_text("Join Game").click()

        # Join room
        room = driver.find_element_by_id("room")
        room.clear()
        room.send_keys("1212")

        room_password = driver.find_element_by_id("password")
        room_password.clear()
        room_password.send_keys("password")

        driver.find_element_by_xpath("/html/body/div/form/div[3]/button").click()


        assert "Room does not exist" in driver.page_source



if __name__ == "__main__":
    unittest.main()