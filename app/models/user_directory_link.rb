class UserDirectoryLink < ActiveRecord::Base
  has_one :directory
  has_one :user
end
