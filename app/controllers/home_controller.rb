
class HomeController < ApplicationController

  def hello

  end

  def search()
    api = GoogleApi.new({ query: params[:name], type: 'lodging'}).search
    sleep 1
    @items = []
    if api['status'] != 'ZERO_RESULTS'
      @items = api['results']
    end
    render json: @items
  end

  def detail()
    @item = []
    api = GoogleApi.new({placeid:params[:id]}).item
    sleep 1
    if api['status'] != 'ZERO_RESULTS'
      @item = api['result']
    end
    render json: @item
  end

end