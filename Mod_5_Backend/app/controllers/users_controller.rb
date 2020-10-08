class UsersController < ApplicationController

    def create
      @user = User.create(users_params)
      payload = { user_id: @user.id }
      token = JWT.encode(payload,ENV['SUPER_SECRET_KEY'],'HS256')
      render :json => { :auth_key => token }, :status => :ok
    end
  
    private
    def users_params
      params.require(:user).permit(:username,:password)
    end
  
  end