class Directory < ActiveRecord::Base
  has_many :myfiles
  belongs_to :user_directory_link
  validates_presence_of :name
  validates_uniqueness_of :name
end
