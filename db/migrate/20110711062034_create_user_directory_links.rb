class CreateUserDirectoryLinks < ActiveRecord::Migration
  def self.up
    create_table :user_directory_links do |t|
      t.integer :user_id
      t.integer :directory_id
      t.timestamps
    end
  end

  def self.down
    drop_table :user_directory_links
  end
end
