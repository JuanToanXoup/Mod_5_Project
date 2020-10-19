class NotesController < ApplicationController
  
    def create
        @new_note = Note.create(notes_params)
        render json: @new_note
    end

    def destroy
      @note = find_note
      @note.destroy
      render json: @note
    end
  
    private
      def notes_params
        params.require(:note).permit(:user_id,:teacher,:text)
      end
  
      def find_note
        @note = Note.find(params[:id])
      end
    
    end