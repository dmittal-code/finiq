"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

type FinanceTerm = {
  id: string;
  term: string;
  definition: string;
  created_at: string;
};

export default function TermsPage() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold mb-4">Basic Financial Terms</h1>
      <p>Glossary of financial terms will go here.</p>
    </div>
  );
} 