class ClassPeriodsController < ApplicationController

  def index
    @class_periods = ClassPeriod.all
    render json: @class_periods
  end

  def show
    @class_array = ClassPeriod.all.select{|class_period| class_period.room_number == params[:id].to_i}
    render json: @class_array
  end

  def getclass
    @students = find_class_period.users
    render json: @students
  end

  def create
  end

  private
    def class_period_params
      params.require(:class_period).permit(:id)
    end

    def find_class_period
      ClassPeriod.find(params[:id])
    end
  
  end