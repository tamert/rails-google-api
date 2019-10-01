GOOGLE_KEY =  'AIzaSyBBwRNlt4ELMAg9k46CV6yCT-1xXtiXB_g' #Rails.application.config.google['google_key']
class GoogleApi
  include HTTParty
  base_uri 'https://maps.googleapis.com/maps/api/place/'
  format :json
  default_params key: GOOGLE_KEY

  def initialize(options)
    @options = { query:  options }
  end

  def search
    self.class.get("/textsearch/json", @options)
  end

  def item
    self.class.get("/details/json", @options)
  end
end
