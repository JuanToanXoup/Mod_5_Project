  class SessionsController < ApplicationController

    def create
      @user = User.find_by(username: params[:username])
      if @user && @user.authenticate(params[:password])
        payload = { user_id: @user.id }
        token = JWT.encode(payload,'secretkey','HS256')
        render :json => { auth_key: token, user: @user }
      else
        render :json => { :msg => "Login failed.. Try again" }
      end
    end
  
end