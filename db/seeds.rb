user = User.new
user.name = "santhosh"
user.password = "password@123"
user.ishevendor = true
user.downloadaccess = true
user.uploadaccess = true
user.isadmin = true
user.uploadaccess = true
user.save


directory = Directory.new
directory.name = "root"
directory.save

udl = UserDirectoryLink.new
udl.user_id = user.id
udl.directory_id = directory.id
udl.save


