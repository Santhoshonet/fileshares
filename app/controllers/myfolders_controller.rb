class MyfoldersController < ApplicationController

  protect_from_forgery 
  before_filter :isuserloggedin

  def index
    @status = 1
    @noofdirsperpage = 20
    @pageindex = 0
    unless params[:pageindex].nil?
      @pageindex = (params[:pageindex].to_i-1) * @noofdirsperpage
      if @pageindex < 0
        @pageindex = 0
      end
    end
    @dirs = Directory.find(:all,:limit => @noofdirsperpage, :offset => @pageindex, :order => "id desc")
    @totalfiles = Directory.count
  end

end
