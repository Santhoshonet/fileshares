FtpManager::Application.routes.draw do
  get "myfolders/index"

  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  match '/receivefile', :controller => "myfiles", :action => "receivefile"
  match '/KeepSessionAlive', :controller => "account", :action => "keepsessionalive"

  match '/CreateFolder/:folder', :controller => "controlpanel", :action => "createfolder"
  match '/FolderPerm/:folder', :controller => "controlpanel", :action => "folderperm"
  match '/DeleteFolder/:folder', :controller => "controlpanel", :action => "deletefolder"
  match '/ModifyFolder/:new/:old', :controller => "controlpanel", :action => "modifyfolder"

  match '/CreateUser/:username', :controller => "controlpanel", :action => "createuser"
  match '/UserPerm/:user', :controller => "controlpanel", :action => "userperm"
  match '/UpdateUser', :controller => "controlpanel", :action => "updateuser"
  match '/DeleteUser/:username', :controller => "controlpanel", :action => "deleteuser"
  match '/ModifyFolder/:new/:old', :controller => "controlpanel", :action => "modifyfolder"

  match '/file/:fileid/:filename', :controller => "myfiles", :action => "getfile"

  match '/myfiles/download/:pageindex', :controller => "myfiles", :action => "download"
  match ':foldername/files', :controller => "myfiles", :action => "download"

  match ":controller/:action"
  
  root :controller => "myfolders", :action => "index"

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id(.:format)))'
end
