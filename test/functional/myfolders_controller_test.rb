require 'test_helper'

class MyfoldersControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
  end

end
