class User < ActiveRecord::Base
  belongs_to :directory
  validates_presence_of :name
  validates_uniqueness_of :name
end
