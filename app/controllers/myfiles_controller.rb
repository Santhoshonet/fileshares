class MyfilesController < ApplicationController
  protect_from_forgery :except => "receivefile"
  before_filter :isuserloggedin, :except => "receivefile"
  before_filter :checkuploadpermission, :except => ["download", "receivefile","getfile"]
  before_filter :checkdownloadpermission, :except => ["upload", "getfile","receivefile"]
  def download
    if params[:id].nil?
        folderid = session[:folder]
    else
        folderid = params[:id]
    end
    @status = 1
    @nooflinksperpage = 10
    @pageindex = 0
    unless params[:pageindex].nil?
      @pageindex = (params[:pageindex].to_i-1) * @nooflinksperpage
      if @pageindex < 0
        @pageindex = 0
      end
    end
    @myfiles = Myfile.find_all_by_directory_id(folderid, :limit => @nooflinksperpage, :offset => @pageindex, :order => "id desc", :select => "name,downloadid,length")
    @totalfiles = Myfile.find_all_by_directory_id(folderid).count
  end

  def upload
    @status = 1
  end

  def receivefile
    if params[:Filedata].blank?
      render :text =>  "invalid argumanets found!"
    end
    file = Myfile.new
    file.uploaded_file= params[:Filedata]
    # creating an icon file if it not exists
    begin
      path = RAILS_ROOT + "/public/images/fileicons/" + File.extname(params[:Filedata].original_filename).to_s[1..3] + ".png"
      if !File.exists?(path)
        imgfile = RAILS_ROOT + "/public/images/fileicons/default.png"
        FileUtils.copy(imgfile,path)
      end
    rescue  Exception => ex
      puts ex
    end
    file.length = file.data.to_s.length
    file.directory_id = Directory.find_by_name(params[:selected_folder].to_s).id
    unless file.save
      render :text =>  file.errors.full_messages[0]
    else
      @status = 0
      render :text => "200 Ok"
    end
  end

  def getfile
    if params[:fileid].nil?
      render :text => nil
    else
      file = Myfile.find_by_downloadid(params[:fileid])
      unless file.nil?
        send_data file.data, :filename => file.name, :type => file.content_type
      else
        render :text => nil
      end
    end
  end

end
