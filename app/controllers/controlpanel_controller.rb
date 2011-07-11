class ControlpanelController < ApplicationController
    protect_from_forgery
    before_filter :isuserloggedin, :checkadminpermission

  def admin
    @status = 0
    if checkpermission("isadmin")
      @status = 1
    end
  end

  def createfolder
    if !params[:folder].nil? and params[:folder].to_s.strip != ""
      directory = Directory.new(:name => params[:folder].to_s.strip)
      if directory.save
        render :text => "#true#folderurl#/FolderPerm/" + params[:folder]
      else
        render :text => directory.errors.full_messages[0]
      end
    else
      render :text => "Unable to create folder due to invalid data has been passed to the server."
    end
  end

  def createuser
    if !params[:username].nil? and params[:username].to_s.strip != ""
      user = User.new(:name => params[:username].to_s.strip)
      user.password = "password"
      user.ishevendor=false
      if user.save
        render :text => "#true#url#/UserPerm/" + params[:username]
      else
        render :text => user.errors.full_messages[0]
      end
    else
      render :text => "Unable to create folder due to invalid data has been passed to the server."
    end
  end

  def deletefolder
    if !params[:folder].nil? and params[:folder].to_s.strip != ""
        directory = Directory.find_by_name(params[:folder].to_s.strip)
        unless directory.nil?
          directory.destroy
        end
        render :text => "#true"
    else
      render :text => "Unable to delete folder due to invalid data has been passed to the server."
    end
  end

  def deleteuser
    if !params[:username].nil? and params[:username].to_s.strip != ""
        user = User.find_by_name(params[:username].to_s.strip)
        unless user.nil?
          user.destroy
        end
        render :text => "#true"
    else
      render :text => "Unable to delete user due to invalid data has been passed to the server."
    end
  end

  def modifyfolder
    if !params[:old].nil? and params[:old].to_s.strip != "" and !params[:new].nil? and params[:new].to_s.strip != ""
        directory = Directory.find_by_name(params[:old].to_s.strip)
        unless directory.nil?
          directory.name = params[:new].to_s.strip
          if directory.save
            render :text => "#true#folderurl#/FolderPerm/" + params[:new]
          else
            render :text => directory.errors.full_messages[0]
          end
        else
          render :text => "#true#folderurl#/FolderPerm/" + params[:old]
        end
    else
      render :text => "Unable to modify folder due to invalid data has been passed to the server."
    end
  end

  def updateuser
    if !params[:username].nil? and params[:username].to_s.strip != "" and !params[:isadmin].nil? and params[:isadmin].to_s.strip != "" and !params[:isupload].nil? and params[:isupload].to_s.strip != "" and !params[:isdownload].nil? and params[:isdownload].to_s.strip != "" and !params[:isdelete].nil? and params[:isdelete].to_s.strip != "" and !params[:isrename].nil? and params[:isrename].to_s.strip != ""
      user = User.find_by_name(params[:username].to_s.strip)
      unless user.nil?
        user.isadmin=params[:isadmin]
        user.uploadaccess=params[:isupload]
        user.downloadaccess=params[:isdownload]
        user.deleteaccess=params[:isdelete]
        user.renameaccess=params[:isrename]
        if user.save
          render :text => "#true#folderurl#/UserPerm/" + params[:username]
          return
        else
          render :text => user.errors.full_messages[0]
          return
        end
      end
      render :text => "unknown error occurred. sorry for the inconvenience."
    else
      render :text => "Unable to modify user due to invalid data has been passed to the server."
    end
  end

  def userperm
    user = User.find_by_name(params[:user])
    unless user.nil?
      @selecteduser = params[:user]
      @availablefolders = []
      @selectedfolders = []
      Directory.all.each do |dir|
        if UserDirectoryLink.find_all_by_directory_id_and_user_id(dir.id,user.id).count == 0
          @availablefolders.push(dir)
        else
          @selectedfolders.push(dir)
        end
      end
    else
      redirect_to :controller => "controlpanel", :action => "admin"
    end
  end

  def updateuserperm
    username = params[:user]
    unless username.nil?
      user = User.find_by_name(username)
      unless user.nil?
        UserDirectoryLink.find_all_by_user_id(user.id).each do |udlink|
          udlink.destroy
        end
        folders = params[:selectedFolders]
        unless folders.nil?
          folders.each do |foldername|
            folder = Directory.find_by_name(foldername)
            unless folder.nil?
              udlink = UserDirectoryLink.new
              udlink.directory_id = folder.id
              udlink.user_id = user.id
              udlink.save
            end
          end
        end
      end
    end
    render :text => "success"
  end

  def folderperm
    dir = Directory.find_by_name(params[:folder])
    unless dir.nil?
      @selectedfolder = params[:folder]
      @availableusers = []
      @selectedusers = []
      User.all.each do |user|
        if UserDirectoryLink.find_all_by_directory_id_and_user_id(dir.id,user.id).count == 0
          @availableusers.push(user)
        else
          @selectedusers.push(user)
        end
      end
    else
      redirect_to :controller => "controlpanel", :action => "admin"
    end
  end

  def updatefolderperm
    folder = params[:folder]
    unless folder.nil?
      dir = Directory.find_by_name(folder)
      unless dir.nil?
        UserDirectoryLink.find_all_by_directory_id(dir.id).each do |udlink|
          udlink.destroy
        end
        users = params[:selectedUsers]
        unless users.nil?
          users.each do |username|
            user = User.find_by_name(username)
            unless user.nil?
              udlink = UserDirectoryLink.new
              udlink.directory_id = dir.id
              udlink.user_id = user.id
              udlink.save
            end
          end
        end
      end
    end
    render :text => "success"
  end

end
