require 'test_helper'

class AccountControllerTest < ActionController::TestCase
  test "should get changepassword" do
    get :changepassword
    assert_response :success
  end

  test "should get login" do
    get :login
    assert_response :success
  end

  test "should get logout" do
    get :logout
    assert_response :success
  end

end
