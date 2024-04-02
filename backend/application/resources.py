from flask_restful import Api
from .user_api import Userinfo
from .user_api import Admininfo
from .theatre_api import Theatreinfo ,Theatres, Theatre_showinfo, Theatre_shows
from .show_api import Showinfo, Shows
from .booking_api import Bookinginfo, Bookings
from .generate_csv import Export_CSV
from .search_api import Searchresult


api = Api()

api.add_resource(Userinfo, "/api/user")
api.add_resource(Admininfo, "/api/admin")
api.add_resource(Theatres, "/api/theatre")
api.add_resource(Theatreinfo, "/api/theatre/<int:theatre_id>")
api.add_resource(Theatre_shows, "/api/theatreshow")
api.add_resource(Theatre_showinfo, "/api/theatreshow/<int:theatre_show_id>")
api.add_resource(Shows, "/api/show")
api.add_resource(Showinfo, "/api/show/<int:show_id>")
api.add_resource(Bookinginfo, "/api/booking/<int:booking_id>")
api.add_resource(Bookings, "/api/booking")
api.add_resource(Export_CSV, "/api/export/<int:theatre_id>")
api.add_resource(Searchresult, "/api/search")