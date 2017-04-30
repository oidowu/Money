namespace :sync do
  task sources: [:environment] do
    postbiz = Feed.where(title: "Washington Post Business").first_or_initialize
    postbiz.update_attributes(url: "http://feeds.washingtonpost.com/rss/business", description: "Washington Post Business", last_modified: DateTime.current)
    postnat = Feed.where(title: "Washington Post National").first_or_initialize
    postnat.update_attributes(url: "http://feeds.washingtonpost.com/rss/national", description: "Washington Post National", last_modified: DateTime.current)
  end
  task feeds: [:environment] do
    Feed.all.each do |feed|
      puts feed.title
      puts feed.url
      puts feed.description
      puts feed.last_modified
      puts feed.to_s
      content = Feedjira::Feed.fetch_and_parse feed.url
      puts content
      content.entries.each do |entry|
        local_entry = feed.articles.where(title: entry.title).first_or_initialize
        local_entry.update_attributes(summary: entry.content, author: entry.author, url: entry.url, published: entry.published)
        p "Synced Entry - #{entry.title}"
      end
      p "Synced Feed - #{feed.title}"
    end
  end
end