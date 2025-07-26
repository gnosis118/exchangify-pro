-- Fix security warning: Set search_path for the function
CREATE OR REPLACE FUNCTION public.update_rate_alerts_updated_at()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;