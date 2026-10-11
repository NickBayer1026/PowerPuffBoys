import 'package:flutter/material.dart';

/// ClassMate theme — indigo seed, Material 3.
ThemeData buildTheme() {
  final scheme = ColorScheme.fromSeed(seedColor: const Color(0xFF4F46E5));
  return ThemeData(
    colorScheme: scheme,
    appBarTheme: const AppBarTheme(centerTitle: false, elevation: 0),
  );
}
