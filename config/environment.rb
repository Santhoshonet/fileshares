# Load the rails application
require File.expand_path('../application', __FILE__)

# Initialize the rails application
FtpManager::Application.initialize!

ENV["NoOfFilesPerPage"] = "15"