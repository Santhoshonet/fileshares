class AccountController < ApplicationController
  protect_from_forgery
  before_filter :isuserloggedin , :except => "login"

  def changepassword
    if !params[:oldpassword].nil? and !params[:newpassword].nil? and !params[:cofirmpassword].nil?
      if params[:oldpassword].to_s.strip != "" and params[:newpassword].to_s.strip != "" and params[:cofirmpassword].to_s.strip != ""
        user = User.find(session[:currentuser])
        unless user.nil?
          if user.password == params[:oldpassword].to_s.strip
              if params[:newpassword].to_s.strip == params[:cofirmpassword].to_s.strip
                  user.password = params[:newpassword].to_s.strip
                  user.save
                  session[:flashinfo] = "Password modified successfully."
                  redirect_to root_url
              else
                @error = "Confirm password is mismatched with new password!"
              end
          else
            @error = "Invalid original password entered!"
          end
        end
      else
        @error = "Input values properly!"
      end
    end
  end

  def login
    if !params[:username].nil? and !params[:password].nil?
      if params[:username].to_s.strip != "" and params[:password].to_s.strip != ""
        user = User.find_by_name(params[:username].to_s.strip)
        unless user.nil?
          if user.password == params[:password].to_s.strip
              session[:currentuser] = user.id
              session[:folder] = Directory.find_by_name(params[:foldername].to_s.strip).id
              session[:flashinfo] = "Signed in successfully."
              redirect_to root_url
          else
            @error = "Invalid username or password entered!"
            session[:currentuser] = nil
          end
        else
          @error = "Invalid username or password entered!"
          session[:currentuser] = nil
        end
      else
        @error = "Input values properly!"
        session[:currentuser] = nil
      end
    end
  end

  def logout
    session[:flashinfo] = "You have successfully signed out."
    session[:currentuser] = nil
    session[:folder] = nil
    render :login
  end

  def keepsessionalive
    render :text => "Ok"
  end

end
