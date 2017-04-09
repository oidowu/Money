# encoding: UTF-8
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
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170407192928) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "articles", force: :cascade do |t|
    t.string   "title"
    t.string   "summary"
    t.string   "url"
    t.string   "author"
    t.integer  "feed_id"
    t.datetime "published"
    t.string   "image_url"
  end

  create_table "feeds", force: :cascade do |t|
    t.string   "title"
    t.string   "url"
    t.string   "description"
    t.datetime "last_modified"
  end

  create_table "follows", force: :cascade do |t|
    t.integer "follower_id", null: false
    t.integer "followee_id", null: false
  end

  add_index "follows", ["followee_id"], name: "index_follows_on_followee_id", unique: true, using: :btree
  add_index "follows", ["follower_id", "followee_id"], name: "index_follows_on_follower_id_and_followee_id", unique: true, using: :btree

  create_table "post_views", force: :cascade do |t|
    t.integer "viewer_id", null: false
    t.integer "post_id",   null: false
  end

  add_index "post_views", ["post_id"], name: "index_post_views_on_post_id", using: :btree
  add_index "post_views", ["viewer_id", "post_id"], name: "index_post_views_on_viewer_id_and_post_id", unique: true, using: :btree

  create_table "posts", force: :cascade do |t|
    t.string  "title",     null: false
    t.string  "body",      null: false
    t.integer "author_id", null: false
  end

  add_index "posts", ["author_id"], name: "index_posts_on_author_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username",         null: false
    t.string   "password_digest",  null: false
    t.string   "session_token",    null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "avi_file_name"
    t.string   "avi_content_type"
    t.integer  "avi_file_size"
    t.datetime "avi_updated_at"
    t.string   "twitter_uid"
  end

  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
