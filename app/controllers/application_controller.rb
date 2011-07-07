class ApplicationController < ActionController::Base
  protect_from_forgery

  private
  def isuserloggedin
    if session[:currentuser].nil?
      redirect_to :controller => "account", :action => "login"
    end
  end

  def checkpermission(permission)
    if session[:currentuser].nil?
      return false
    end
    user = User.find(session[:currentuser])
    if permission.to_s.strip == "isadmin"
      return user.isadmin
    elsif permission.to_s.strip == "isvendor"
      return user.ishevendor
    elsif permission.to_s.strip == "upload"
      return user.uploadaccess
    elsif permission.to_s.strip == "download"
      return user.downloadaccess
    elsif permission.to_s.strip == "delete"
      return user.deleteaccess
    end
      false
  end

  private
  def checkadminpermission
    unless checkpermission("isadmin")
      @status = 0
      render 'controlpanel/admin'
    end
  end

  def checkuploadpermission
    unless checkpermission("upload")
      @status = 0
      render 'myfiles/upload'
    end
  end

  def checkdownloadpermission
    unless checkpermission("download")
      @status = 0
      render 'myfiles/download'
    end
  end

  def checkdeletepermission
    unless checkpermission("delete")
      render :text => "dont have permission to delete the file."
    end
  end

end
