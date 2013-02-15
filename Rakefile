require "rubygems"
require "rake"
require "date"
require "net/http"

class String
  # This is a Title => this-is-a-title
  def to_post_slug
    self.gsub(" ", "-").downcase
  end
end

namespace :assets do
  desc "compresses/compiles js and css files"
  task compile: [:scss, :jam]

  desc "compiles scss into css"
  task :scss do
    puts "Compiling scss files..."
    system "bundle exec sass --scss --style compact scss/ol.scss scss/ol.css"
  end

  desc "runs jammit"
  task :jam do
    puts "Compiling javascript and css files..."
    system "jammit -o . -c _assets.yml"
    system "rm scss/ol.css"
  end
end

namespace :deploy do
  desc "deploy changes"
  task :changes do
    system "git push origin master"
  end

  desc "deploys changes and pings services"
  task post: [:changes, :ping]

  desc "pings services to let them know of new content"
  task :ping do
    uri = "http://objectlateral.com"
    puts "pinging google"
    Net::HTTP.get("www.google.com" , "/ping?sitemap=" + URI.escape(uri+"/sitemap.xml"))
  end
end

namespace :server do
  desc "Run the jekyll server for all posts"
  task :all do
    system "bundle exec jekyll --server --auto"
  end

  desc "Run the jekyll server for most recent post"
  task :one do
    system "bundle exec jekyll --server --auto --limit_posts 1"
  end
end

desc "Delete generated _site files"
task :clean do
  system "rm -rf _site"
end

desc "builds _site from current source"
task :build do
  system "bundle exec jekyll"
end

desc "cleans and builds _site from current source"
task clean_build: [:clean, :build]

desc "generates a new draft post from argument"
task :draft, [:name] do |t,args|
  abort "you need to provide a post name" unless args.name
  file = "_drafts/#{args.name.to_post_slug}.md"
  File.open(file, "w") do |f|
    f.puts "---"
    f.puts "layout: post"
    f.puts "published: true"
    f.puts "title: \"#{args.name}\""
    f.puts "subtitle: \"\""
    f.puts "---"
  end
  system "open #{file}"
end

desc "Moves drafted post into _posts for editing"
task :edit, [:name] do |t,args|
  abort "you need to provide a post name" unless args.name
  post = "#{args.name.to_post_slug}.md"
  draft = File.expand_path "_drafts/#{post}"
  abort "no draft matches that name" unless File.exist?(draft)
  puts "Linking #{post} for editing."
  FileUtils.mv draft, "_posts/#{Date.today.to_s}-#{post}"
  Rake::Task["server:one"].invoke
end
