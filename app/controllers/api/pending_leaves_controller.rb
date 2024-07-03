class Api::PendingLeavesController < ApplicationController
  before_action :set_leave, only: [:approve, :disapprove]

  def index
    pending_leaves = Leave.where(status: 'pending').includes(:employee)
    render json: pending_leaves, include: { employee: { only: [:id, :name] } }
  end

  def approve
    if @leave.status == 'pending'
      if @leave.update(status: 'approved')
        render json: @leave
      else
        render json: @leave.errors, status: :unprocessable_entity
      end
    else
      render json: { error: 'Leave is not pending. Cannot approve.' }, status: :unprocessable_entity
    end
  end

  def disapprove
    if @leave.status == 'pending'
      if @leave.update(status: 'disapproved')
        render json: @leave
      else
        render json: @leave.errors, status: :unprocessable_entity
      end
    else
      render json: { error: 'Leave is not pending. Cannot disapprove.' }, status: :unprocessable_entity
    end
  end

  private

  def set_leave
    @leave = Leave.find(params[:id])
  end
end
