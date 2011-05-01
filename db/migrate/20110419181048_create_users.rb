class CreateUsers < ActiveRecord::Migration
  def self.up
    create_table :users do |t|
      t.string :name
      t.string :password
      t.boolean :isadmin
      t.boolean :ishevendor
      t.boolean :uploadaccess
      t.boolean :downloadaccess
      t.boolean :deleteaccess
      t.boolean :renameaccess
      t.integer :directory_id
      t.timestamps
    end
  end

  def self.down
    drop_table :users
  end
end
