from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options

# Configure the browser
chrome_options = Options()
chrome_options.add_argument("--headless")
service = Service('/path/to/chromedriver')  # Adjust path to ChromeDriver
driver = webdriver.Chrome(service=service, options=chrome_options)

# Load the file
driver.get('file:///path/to/build_file.html')

# Get the rendered HTML
rendered_html = driver.page_source

# Save to a file
with open('rendered_output.html', 'w', encoding='utf-8') as f:
    f.write(rendered_html)

driver.quit()

