from flask_restful import Resource
from flask_security import auth_required
from flask_restful import  marshal_with, fields, reqparse
from .models import Theatre ,Show, Theatre_show
from .theatre_api import theatre_output, theatre_show_output
# from .show_api import show_output


create_search_parser = reqparse.RequestParser()
create_search_parser.add_argument('search_query')

search_output = {
    "theatres_res" :fields.List(fields.Nested(theatre_output)),
    "theatre_shows_res" :fields.List(fields.Nested(theatre_show_output)),
    # "shows" :fields.List(fields.Nested(show_output))
}

class Searchresult(Resource):
    @auth_required("token")
    @marshal_with(search_output)
    def post(self):
        args = create_search_parser.parse_args()
        search_query = args.get("search_query", None)

        theatres_res = Theatre.query.filter(
            (Theatre.theatre_name.like('%' + search_query + '%')) |
            (Theatre.place.like('%' + search_query + '%'))
        ).all()

        shows_res = Show.query.filter(
            (Show.tags.like('%' + search_query + '%')) |
            (Show.title.like('%' + search_query + '%'))
        ).all()

        theatre_shows_res = []
        for show in shows_res:
            theatre_shows_res.extend(show.theatre_shows)
        
        return {"theatres_res" : theatres_res,'theatre_shows_res' : theatre_shows_res}
