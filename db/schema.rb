# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20110711062034) do

  create_table "directories", :force => true do |t|
    t.string   "name"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "directories_users", :force => true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "myfiles", :force => true do |t|
    t.string   "name"
    t.integer  "length"
    t.string   "content_type"
    t.binary   "data"
    t.integer  "directory_id"
    t.string   "downloadid"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "user_directory_links", :force => true do |t|
    t.integer  "user_id"
    t.integer  "directory_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", :force => true do |t|
    t.string   "name"
    t.string   "password"
    t.integer  "directory_id"
    t.boolean  "isadmin"
    t.boolean  "ishevendor"
    t.boolean  "uploadaccess"
    t.boolean  "downloadaccess"
    t.boolean  "deleteaccess"
    t.boolean  "renameaccess"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
