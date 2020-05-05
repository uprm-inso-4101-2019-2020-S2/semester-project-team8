ALTER TABLE menstrual_cycle
    ADD CONSTRAINT no_overlap_bleed_end
        CHECK ( bleed_end BETWEEN bleed_start AND end_date );


ALTER TABLE menstrual_cycle
    ADD CONSTRAINT no_surpass_bleed_start_end
        CHECK ( bleed_start < end_date 
        AND bleed_end < end_date
        AND bleed_end > bleed_start );