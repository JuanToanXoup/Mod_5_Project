class UsersController < ApplicationController

  def index
    @users = User.all
    render json: @users
  end

  def show
    render json: find_user, include: [:allergies,:emergency_contacts,:notes,:pre_existing_conditions,:prescriptions,:class_periods]
  end

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

    def find_user
      @user = User.find(params[:id])
    end
  
  end