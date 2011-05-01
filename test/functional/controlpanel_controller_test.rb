require 'test_helper'

class ControlpanelControllerTest < ActionController::TestCase
  test "should get admin" do
    get :admin
    assert_response :success
  end

  test "should get createfolder" do
    get :createfolder
    assert_response :success
  end

  test "should get createuser" do
    get :createuser
    assert_response :success
  end

  test "should get deletefolder" do
    get :deletefolder
    assert_response :success
  end

  test "should get folderperm" do
    get :folderperm
    assert_response :success
  end

  test "should get modifyfolder" do
    get :modifyfolder
    assert_response :success
  end

  test "should get updateuser" do
    get :updateuser
    assert_response :success
  end

  test "should get userperm" do
    get :userperm
    assert_response :success
  end

end
