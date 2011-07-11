class User < ActiveRecord::Base
  belongs_to :user_directory_link
  validates_presence_of :name
  validates_uniqueness_of :name
end
