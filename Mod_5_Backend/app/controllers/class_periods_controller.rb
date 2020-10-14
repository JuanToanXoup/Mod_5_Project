class ClassPeriodsController < ApplicationController

  def index
    @class_periods = ClassPeriod.all
    render json: @class_periods
  end

  def show
  end

  def create
  end

  private
    def class_period_params
      params.require(:user).permit(:username,:password)
    end

    def find_class_period
      @class_period = ClassPeriod.find(params[:id])
    end
  
  end