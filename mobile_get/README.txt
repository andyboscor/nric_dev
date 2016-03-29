Views resources on REST API provide a Drupal HTML views as json objects with nodes.
Many fields in this object already come with HTML tags:
E.G ( from "news" view): 
"node_title": "<a href=\"http://www.who.int/campaigns/aids-day/2015/event/en/\" target=\"_blank\">World AIDS Day - 1 December 2015</a>"#

LISTING of views and their name path

NEWS: news_archive
NEWS: lastest_news
RECENTS: recently_added_resources 
INFOCUS: Infocus is a static node: use get_node instead, for now it's id is  "54121"
TRAINING: courses
CONFERENCES: conferences ( the categories listing on the webpage seems to be hard-coded)
USEFULLINKS: directory
