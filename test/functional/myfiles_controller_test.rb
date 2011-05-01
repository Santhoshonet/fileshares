require 'test_helper'

class MyfilesControllerTest < ActionController::TestCase
  setup do
    @myfile = myfiles(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:myfiles)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create myfile" do
    assert_difference('Myfile.count') do
      post :create, :myfile => @myfile.attributes
    end

    assert_redirected_to myfile_path(assigns(:myfile))
  end

  test "should show myfile" do
    get :show, :id => @myfile.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @myfile.to_param
    assert_response :success
  end

  test "should update myfile" do
    put :update, :id => @myfile.to_param, :myfile => @myfile.attributes
    assert_redirected_to myfile_path(assigns(:myfile))
  end

  test "should destroy myfile" do
    assert_difference('Myfile.count', -1) do
      delete :destroy, :id => @myfile.to_param
    end

    assert_redirected_to myfiles_path
  end
end
