class CreateMyfiles < ActiveRecord::Migration
  def self.up
    create_table :myfiles do |t|
      t.string :name
      t.integer :length
      t.string :content_type
      t.binary :data
      t.integer :directory_id
      t.string :downloadid
      t.timestamps
    end
  end

  def self.down
    drop_table :myfiles
  end
end
