# from .models import Theatre
from flask import jsonify
from flask_security import auth_required, roles_required
from flask_restful import Resource
from ..tasks import export_csv
from ..validation import  NotFoundError
from flask import current_app as app
from flask import send_from_directory, send_file
import os


class Export_CSV(Resource):
    @auth_required("token")
    @roles_required("admin")
    def get(self, theatre_id):
        job =  export_csv.delay(theatre_id)
        result = job.wait()
        if result:
            return result , 200
        else:
            raise NotFoundError(404)
    
# class Export_CSV(Resource):
#     @auth_required("token")
#     @roles_required("admin")
#     def get(self, theatre_id):

#         theatre = Theatre.query.filter(Theatre.theatre_id == theatre_id).first()
        
#         if theatre:
#             job =  export_csv.delay(theatre)
#             result = job.wait()
#             return result, 200
#         else:
#             return jsonify(error = "Not found",status = 404)

class Download_CSV(Resource):
    @auth_required("token")
    @roles_required("admin")
    def get(self, filename):
        file_directory = app.config['CSV_DOWNLOAD_PATH']
        filepath = os.path.join(file_directory, filename)
        return send_file(filepath, as_attachment=True, mimetype='application/octet-stream')