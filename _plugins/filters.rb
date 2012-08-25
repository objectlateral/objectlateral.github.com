module Jekyll
  module Filters
    def date_to_ordinal_string(date)
      day = date.day
      suffix = if (11..13).include?(day % 100)
        "th"
      else
        case day % 10
          when 1; "st"
          when 2; "nd"
          when 3; "rd"
          else    "th"
        end
      end
      date.strftime("%B #{day}<sup>#{suffix}</sup>, %Y")
    end
  end
end
